// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract QuadraticVoting {
    address public owner;
    uint256 public totalFunds;

    struct Proposal {
        string title;
        string description;
        uint256 votes;
        uint256 funds;
    }

    Proposal[] public proposals;

    mapping(address => bool) public voters;
    mapping(address => mapping(uint256 => uint256)) public votes;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function createProposal(string memory _title, string memory _description) external {
        require(bytes(_title).length > 0, "Title should not be empty");
        require(bytes(_description).length > 0, "Description should not be empty");
        proposals.push(Proposal({
            title: _title,
            description: _description,
            votes: 0,
            funds: 0
        }));
    }

    function vote(uint256 _proposalId, uint256 _amount) external {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(_amount > 0, "Amount must be greater than zero");

        Proposal storage proposal = proposals[_proposalId];
        require(proposal.funds >= _amount, "Not enough funds in the proposal");

        uint256 sqrtVotes = sqrt(votes[msg.sender][_proposalId] + _amount);
        uint256 prevSqrtVotes = sqrt(votes[msg.sender][_proposalId]);
        proposal.votes += sqrtVotes - prevSqrtVotes;
        votes[msg.sender][_proposalId] = sqrtVotes;
        proposal.funds -= _amount;

        if (!voters[msg.sender]) {
            voters[msg.sender] = true;
        }
    }

    // function allocateFunds() external onlyOwner {
    //     uint256 remainingFunds = totalFunds;
    //     for (uint256 i = 0; i < proposals.length; i++) {
    //         Proposal storage proposal = proposals[i];
    //         proposal.funds = (proposal.votes * proposal.votes * totalFunds) / (totalVotes(i) * totalVotes(i));
    //         remainingFunds -= proposal.funds;
    //     }
    //     totalFunds = remainingFunds;
    // }

    // function totalVotes(uint256 _proposalId) internal view returns (uint256) {
    //     uint256 total = 0;
    //     for (uint256 i = 0; i < proposals.length; i++) {
    //         total += sqrt(votes[msg.sender][i]);
    //     }
    //     return total;
    // }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        if (x > 3) {
            y = x;
            uint256 z = (x + 1) / 2;
            while (z < y) {
                y = z;
                z = (x / z + z) / 2;
            }
        } else if (x != 0) {
            y = 1;
        }
    }

    function depositFunds() external payable onlyOwner {
        totalFunds += msg.value;
    }

    function withdrawFunds() external onlyOwner {
        require(totalFunds > 0, "No funds available for withdrawal");
        payable(owner).transfer(totalFunds);
        totalFunds = 0;
    }
}
