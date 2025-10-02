// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ForuNFT} from "../src/ForuNFT.sol";

contract ForuNFTScript is Script {
    ForuNFT public foruNFT;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        foruNFT = new ForuNFT();

        vm.stopBroadcast();
    }
}
