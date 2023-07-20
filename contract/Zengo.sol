// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ZengoDAO {
    address public owner;
    uint256 public registrationDuration;
    uint256 public pluralVotingPoints;

    struct Proposal {
        uint256 id;
        string title;
        string description;
        address submitter;
        bool isVerified;
        uint256 votes;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    mapping(address => bool) public moderators;
    address[] public moderatorList;

    mapping(address => uint256) public votingPoints;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyModerator() {
        require(moderators[msg.sender], "Only moderators can call this function");
        _;
    }

    constructor(uint256 _registrationDuration, uint256 _pluralVotingPoints) {
        owner = msg.sender;
        registrationDuration = _registrationDuration;
        pluralVotingPoints = _pluralVotingPoints;
        moderators[msg.sender] = true;
        moderatorList.push(msg.sender);
    }

    function addModerator(address _moderator) external onlyOwner {
        moderators[_moderator] = true;
        moderatorList.push(_moderator);
    }

    function removeModerator(address _moderator) external onlyOwner {
        moderators[_moderator] = false;
        for (uint256 i = 0; i < moderatorList.length; i++) {
            if (moderatorList[i] == _moderator) {
                moderatorList[i] = moderatorList[moderatorList.length - 1];
                moderatorList.pop();
                break;
            }
        }
    }

    function submitProposal(string calldata _title, string calldata _description) external {
        require(!hasVoted[proposalCount][msg.sender], "You have already submitted a proposal");
        require(votingPoints[msg.sender] > 0, "You need voting points to submit a proposal");

        Proposal memory newProposal = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            submitter: msg.sender,
            isVerified: false,
            votes: 0
        });

        proposals[proposalCount] = newProposal;
        proposalCount++;
    }

    function vote(uint256 _proposalId) external onlyModerator {
        require(!hasVoted[_proposalId][msg.sender], "You have already voted for this proposal");

        proposals[_proposalId].votes += votingPoints[msg.sender];
        hasVoted[_proposalId][msg.sender] = true;
    }

    function allocateFunds(uint256 _proposalId) external onlyModerator {
        require(!proposals[_proposalId].isVerified, "The proposal is already funded");

        // Add logic to allocate funds based on plural voting points.
        // You may use an ERC20 token for voting points and funding.

        proposals[_proposalId].isVerified = true;
    }

    function setVotingPoints(address[] calldata _voters, uint256[] calldata _points) external onlyModerator {
        require(_voters.length == _points.length, "Arrays length mismatch");

        for (uint256 i = 0; i < _voters.length; i++) {
            votingPoints[_voters[i]] = _points[i];
        }
    }
}
