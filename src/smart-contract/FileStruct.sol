pragma solidity ^0.4.25;

contract FileStruct{
    
    enum Kind {Unidentified, Image, Music}

    struct File{
        uint idFile;
        string fileHash;
        address owner;
        uint price;
        uint totalDownloader;
        int weekDownloader;
        uint blockTime;
        bool valid;
        Kind kind;
        bool IsISO;
    }
    
    struct FileRanking{
        uint idFile;
        int lastWeekDownloader;
    }
    
    struct ISO{
        uint offerPercent;
        uint offerAmount;
        uint amountRemaining;
        uint timeExpired;
        uint ownerPercent;
        uint numberOfDownload;
        uint week;
        Invest[] investListISO;
    }
    
    struct Invest{
        address investor;
        uint percentage;
        uint amount;
    }
    
    struct User{
        address ownerAddress;
        uint[] uploadList;
        uint[] downloadList;
        uint[] investList;
    }
}