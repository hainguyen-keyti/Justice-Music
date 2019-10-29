// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./FileStorage.sol";
import "./FileStruct.sol";
import "./Ownable.sol";

contract Ranking is FileStruct, Ownable{
    
    event Log_RankPerWeek(address sender, uint _now);
    
    FileStorage fileStorage;
    
    constructor() public payable{
        fileStorage = FileStorage(0x6dC14057fB774B6a5a09cd2110472f8D91413DE9);
    }
    
    function rankCalculator(Kind _kind) internal{
        uint temp = 0;
        for(uint i = 0;; i++){
            File memory max;
            max.weekDownloader = -1;
            for(uint j = 0; j < fileStorage.getFileLength(); j++){
                if((fileStorage.getFileList(j).kind == _kind) && (fileStorage.getFileList(j).weekDownloader > max.weekDownloader)){
                    max = fileStorage.getFileList(j);
                }
            }
            if((max.weekDownloader == -1) || (temp == 10)){
                break;
            }else{
                temp++;
            }
            FileRanking memory tempRank = FileRanking(max.idFile, max.weekDownloader);
            fileStorage.setRankingHistory(now, _kind, tempRank);
            fileStorage.setFileList_weekDownloader(max.idFile, -(fileStorage.getFileList(max.idFile).weekDownloader+2));
        }
    }
    
    function resetWeekDowloader() internal{
        for ( uint i = 0; i < fileStorage.getFileLength(); i++){
            fileStorage.setFileList_weekDownloader(i, -fileStorage.getFileList(i).weekDownloader);
        }
    }
    
    function RankPerWeek() public onlyOwner{
        rankCalculator(Kind.Image);
        rankCalculator(Kind.Music);
        rankCalculator(Kind.Unidentified);
        fileStorage.setTimeRanking(now);
        resetWeekDowloader();
        emit Log_RankPerWeek(msg.sender, now);
    }
    
    function getRanking(uint _TimeRanking, Kind _kind) public view returns(File[] memory, int[] memory){
        uint tempLength = fileStorage.getRankingHistory(_TimeRanking, _kind).length;
        uint[] memory tempID = new uint[](tempLength);
        int[] memory tempDownloader = new int[](tempLength);
        for (uint i = 0; i < tempLength; i++){
            tempID[i] = fileStorage.getRankingHistory(_TimeRanking, _kind)[i].idFile;
            tempDownloader[i] = fileStorage.getRankingHistory(_TimeRanking, _kind)[i].lastWeekDownloader;
        }
        File[] memory tempFile = fileStorage.getFileFunc(tempID);
        return (tempFile, tempDownloader);
    }
    
    function getTimeRanking() public view returns(uint[] memory){
        return fileStorage.getTimeRanking();
    }
    
}
