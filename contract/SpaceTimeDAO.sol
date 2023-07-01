// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import { MarketAPI } from "@zondax/filecoin-solidity/contracts/v0.8/mocks/MarketAPI.sol";
import { CommonTypes } from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";
import { MarketTypes } from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketAPI.sol";

contract SpaceTimeDAO is AccessControl {

    bytes32 internal constant MODERATOR = keccak256("MODERATOR");
    bytes32 internal constant CATALYST = keccak256("CATALYST");
    uint32 internal proposalId;
    MarketAPI marketApiInstance = MarketAPI(marketApiAddress);
    struct Deal {
        address minerAddress;
        address clientAddress;
        uint256 startDate;
        uint256 endDate;
        uint256 pricePerByte;
        uint256 dataSize;
        uint256 status;
        bytes32 contentCID;
    }

    mapping(bytes32 => Deal) public deals;
    mapping(bytes => bool) public cidSet;
    mapping(bytes => uint) public cidSizes;
    mapping(bytes => mapping(uint64 => bool)) public cidProviders;
    mapping(uint32 => Proposal) public proposalDetail;
    mapping(address => mapping(uint32 => bool)) proposalVoted; 
    
    enum DealStatus {
        Inactive,
        Active,
        Terminated
    }

    struct Proposal {
        address owner;
        uint32 totalUpvote;
        uint32 totalDownvote;
        Status status;
        string cid;
    }

    enum Status {
        Review,
        Filtering,
        Filtering_Vote,
        Funding,
        Rejected,
        Solved
    }

    error AlreadyVoted();
    error ProposalNotCreated();

    event NewProposal(uint32 id, address owner, string cid);
    event StateUpdateProposal(uint32 id, Status newState);
    event CidUpdateProposal(uint32 id, string cid);    
    event TotalUpvoteUpdateProposal(uint32 id, uint32 totalUpvote);
    event TotalDownvoteUpdateProposal(uint32 id, uint32 totalDownvote);    


    constructor() {  
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function grantRoleModerator(address _address) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MODERATOR, _address);
    }

    function grantRoleCatalyst(address _address) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(CATALYST, _address);
    }

    function create(string calldata _cid) external {

        Proposal memory proposal;
        proposal.owner = msg.sender;
        proposal.status = Status.Review;
        proposal.cid = _cid;

        proposalDetail[proposalId] = proposal;

        emit NewProposal(proposalId, msg.sender, _cid);

        proposalId += 1;        
    }

    function update(uint32 _proposalId, Status _status) public onlyRole(DEFAULT_ADMIN_ROLE) {
        proposalDetail[_proposalId].status = _status;

        emit StateUpdateProposal(_proposalId, _status);
    }

    function updateCID(uint32 _proposalId, string calldata _cid) public onlyRole(DEFAULT_ADMIN_ROLE) {
        proposalDetail[_proposalId].cid = _cid;

        emit CidUpdateProposal(_proposalId, _cid);
    }    

    function upvote(uint32 _proposalId) public {

        if (proposalVoted[msg.sender][_proposalId]) {
            revert AlreadyVoted();
        }

        if (_proposalId >= proposalId) {
            revert ProposalNotCreated();
        }

        proposalDetail[_proposalId].totalUpvote += 1;

        emit TotalUpvoteUpdateProposal(_proposalId, proposalDetail[_proposalId].totalUpvote);

        proposalVoted[msg.sender][_proposalId] = true;
    }

    function downvote(uint32 _proposalId) public {

        if (proposalVoted[msg.sender][_proposalId]) {
            revert AlreadyVoted();
        }
        
        proposalDetail[_proposalId].totalDownvote += 1;

        emit TotalDownvoteUpdateProposal(_proposalId, proposalDetail[_proposalId].totalDownvote);

        proposalVoted[msg.sender][_proposalId] = true;
    }

    function createDeal(
        address minerAddress,
        address clientAddress,
        uint256 startDate,
        uint256 endDate,
        uint256 pricePerByte,
        uint256 dataSize,
        bytes32 contentCID
    ) public {
        bytes32 dealId = sha256(
            abi.encodePacked(
                minerAddress,
                clientAddress,
                startDate,
                endDate,
                pricePerByte,
                dataSize,
                contentCID
            )
        );
        deals[dealId] = Deal(
            minerAddress,
            clientAddress,
            startDate,
            endDate,
            pricePerByte,
            dataSize,
            uint256(DealStatus.Active),
            contentCID
        );
    }

    function queryDeal(bytes32 dealId)
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bytes32
        )
    {
        Deal memory deal = deals[dealId];
        return (
            deal.minerAddress,
            deal.clientAddress,
            deal.startDate,
            deal.endDate,
            deal.pricePerByte,
            deal.dataSize,
            deal.status,
            deal.contentCID
        );
    }

    function addCID(bytes calldata cidraw, uint size) public onlyRole(DEFAULT_ADMIN_ROLE) {
       cidSet[cidraw] = true;
       cidSizes[cidraw] = size;
    }

    function updateDeal(
        bytes32 dealId,
        uint256 endDate,
        uint256 pricePerByte
    ) public {
        Deal memory deal = deals[dealId];
        deal.endDate = endDate;
        deal.pricePerByte = pricePerByte;
    }

    function terminateDeal(bytes32 dealId) public {
        Deal memory deal = deals[dealId];
        deal.status = uint256(DealStatus.Terminated);
    }
}
