// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract SimpleFaucet is Ownable, PermissionsEnumerable, ContractMetadata {
    address[] claimers;
    address public deployer;

    constructor() {
        deployer = msg.sender;
    }

    function deposit() public payable {}

    function claim(address payable _claimer) public payable {
        address claimer;
        for (uint i = 0; i < claimers.length; i++) {
            if (claimers[i] == msg.sender) {
                claimer = msg.sender;
            }
        }
        require(
            address(this).balance >= 0.005 ether,
            "contract does not have enough balance"
        );
        require(claimer != msg.sender, "You already claimed the poap amount");
        claimers.push(_claimer);
        payable(_claimer).transfer(0.005 ether);
    }

    // admin part

    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(msg.value);
    }

    function changeAdmin(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

    function resetClaimers() public onlyOwner {
        claimers = new address payable[](0);
    }

    function checkClaimers() public view returns (address[] memory) {
        return claimers;
    }

    function _canSetContractURI()
        internal
        view
        virtual
        override
        returns (bool)
    {
        return msg.sender == deployer;
    }
}
