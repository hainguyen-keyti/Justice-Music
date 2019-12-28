exports.userBehaviorABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			}
		],
		"name": "Log_downloadFile",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "investAmount",
				"type": "uint256"
			}
		],
		"name": "Log_investISO",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum FileStruct.Kind",
				"name": "kind",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			}
		],
		"name": "Log_uploadFile",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offerPercent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offerAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maintain",
				"type": "uint256"
			}
		],
		"name": "Log_usingISO",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Log_withdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "cancelContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_songHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contractMoney",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ownerCompensationAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_signer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_signerCompensationAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_timeExpired",
				"type": "uint256"
			}
		],
		"name": "createContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "dowloadFile",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalaceOfContract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "getFileById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getISOAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "getISOId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getISOList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "getOwnerContractList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "getSignerContractList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "getSongContract",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "songHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contractMoney",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ownerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "ownerApproved",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "signerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "signerApproved",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCancel",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.SongContract[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserDownload",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserUpload",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_investAmount",
				"type": "uint256"
			}
		],
		"name": "investISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "selfDestruct",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "setApproved",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_fileStorage",
				"type": "address"
			}
		],
		"name": "setTokenFileStorageAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_fileHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "enum FileStruct.Kind",
				"name": "_kind",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_idMongoose",
				"type": "string"
			}
		],
		"name": "uploadFile",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offerPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offerAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maintain",
				"type": "uint256"
			}
		],
		"name": "usingISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

exports.tokenABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "UserBehaviorContract",
				"type": "address"
			}
		],
		"name": "setOnlyUserBehaviorContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferFromTo",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

exports.fileStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"name": "_userApproved",
				"type": "address"
			}
		],
		"name": "setApproved",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"name": "_userCancel",
				"type": "address"
			}
		],
		"name": "setCancelContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Numb",
				"type": "uint256"
			}
		],
		"name": "setFileLength",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_IDFile",
				"type": "uint256"
			},
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "idMongoose",
						"type": "string"
					},
					{
						"name": "fileHash",
						"type": "string"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "price",
						"type": "uint256"
					},
					{
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"name": "valid",
						"type": "bool"
					},
					{
						"name": "kind",
						"type": "uint8"
					},
					{
						"name": "IsISO",
						"type": "bool"
					}
				],
				"name": "_File",
				"type": "tuple"
			}
		],
		"name": "setFileList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			},
			{
				"name": "_IsISO",
				"type": "bool"
			}
		],
		"name": "setFileList_IsISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			},
			{
				"name": "_Numb",
				"type": "uint256"
			}
		],
		"name": "setFileList_totalDownloader",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			},
			{
				"name": "_Numb",
				"type": "int256"
			}
		],
		"name": "setFileList_weekDownloader",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			},
			{
				"name": "_Numb",
				"type": "uint256"
			},
			{
				"name": "_Value",
				"type": "uint256"
			}
		],
		"name": "setISOList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			},
			{
				"components": [
					{
						"name": "investor",
						"type": "address"
					},
					{
						"name": "percentage",
						"type": "uint256"
					},
					{
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "_tempInvest",
				"type": "tuple"
			}
		],
		"name": "setISOList_investListISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			},
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "idMongoose",
						"type": "string"
					},
					{
						"name": "fileHash",
						"type": "string"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "price",
						"type": "uint256"
					},
					{
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"name": "valid",
						"type": "bool"
					},
					{
						"name": "kind",
						"type": "uint8"
					},
					{
						"name": "IsISO",
						"type": "bool"
					}
				],
				"name": "_file",
				"type": "tuple"
			}
		],
		"name": "setISOListFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_IsUsingID",
				"type": "uint256"
			}
		],
		"name": "setIsUsingID",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setListIDISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ownerUserBehaviorContract",
				"type": "address"
			},
			{
				"name": "_ownerRankingContract",
				"type": "address"
			}
		],
		"name": "setOnlyOwnerContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Now",
				"type": "uint256"
			},
			{
				"name": "_kind",
				"type": "uint8"
			},
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "lastWeekDownloader",
						"type": "int256"
					}
				],
				"name": "_fileRanking",
				"type": "tuple"
			}
		],
		"name": "setRankingHistory",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "songHash",
						"type": "string"
					},
					{
						"name": "contentHash",
						"type": "string"
					},
					{
						"name": "contractMoney",
						"type": "uint256"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "ownerCompensationAmount",
						"type": "uint256"
					},
					{
						"name": "ownerApproved",
						"type": "bool"
					},
					{
						"name": "signer",
						"type": "address"
					},
					{
						"name": "signerCompensationAmount",
						"type": "uint256"
					},
					{
						"name": "signerApproved",
						"type": "bool"
					},
					{
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"name": "isCancel",
						"type": "bool"
					}
				],
				"name": "_songContract",
				"type": "tuple"
			}
		],
		"name": "setSongContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Now",
				"type": "uint256"
			}
		],
		"name": "setTimeRanking",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"name": "_contractOwner",
				"type": "address"
			},
			{
				"name": "_contractSigner",
				"type": "address"
			}
		],
		"name": "setUserContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Recipient",
				"type": "address"
			},
			{
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setUserList_downloadList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Owner",
				"type": "address"
			},
			{
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setUserList_investList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Owner",
				"type": "address"
			},
			{
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setUserList_uploadList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Numb",
				"type": "uint256"
			}
		],
		"name": "setVarIdFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_temp",
				"type": "uint256[]"
			}
		],
		"name": "getFileFunc",
		"outputs": [
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "idMongoose",
						"type": "string"
					},
					{
						"name": "fileHash",
						"type": "string"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "price",
						"type": "uint256"
					},
					{
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"name": "valid",
						"type": "bool"
					},
					{
						"name": "kind",
						"type": "uint8"
					},
					{
						"name": "IsISO",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFileLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "getFileList",
		"outputs": [
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "idMongoose",
						"type": "string"
					},
					{
						"name": "fileHash",
						"type": "string"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "price",
						"type": "uint256"
					},
					{
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"name": "valid",
						"type": "bool"
					},
					{
						"name": "kind",
						"type": "uint8"
					},
					{
						"name": "IsISO",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "getISOList",
		"outputs": [
			{
				"components": [
					{
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"name": "idFile",
								"type": "uint256"
							},
							{
								"name": "idMongoose",
								"type": "string"
							},
							{
								"name": "fileHash",
								"type": "string"
							},
							{
								"name": "owner",
								"type": "address"
							},
							{
								"name": "price",
								"type": "uint256"
							},
							{
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"name": "valid",
								"type": "bool"
							},
							{
								"name": "kind",
								"type": "uint8"
							},
							{
								"name": "IsISO",
								"type": "bool"
							}
						],
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"name": "investor",
								"type": "address"
							},
							{
								"name": "percentage",
								"type": "uint256"
							},
							{
								"name": "amount",
								"type": "uint256"
							}
						],
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getISOListAddress",
		"outputs": [
			{
				"components": [
					{
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"name": "idFile",
								"type": "uint256"
							},
							{
								"name": "idMongoose",
								"type": "string"
							},
							{
								"name": "fileHash",
								"type": "string"
							},
							{
								"name": "owner",
								"type": "address"
							},
							{
								"name": "price",
								"type": "uint256"
							},
							{
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"name": "valid",
								"type": "bool"
							},
							{
								"name": "kind",
								"type": "uint8"
							},
							{
								"name": "IsISO",
								"type": "bool"
							}
						],
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"name": "investor",
								"type": "address"
							},
							{
								"name": "percentage",
								"type": "uint256"
							},
							{
								"name": "amount",
								"type": "uint256"
							}
						],
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getISOListInfo",
		"outputs": [
			{
				"components": [
					{
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"name": "idFile",
								"type": "uint256"
							},
							{
								"name": "idMongoose",
								"type": "string"
							},
							{
								"name": "fileHash",
								"type": "string"
							},
							{
								"name": "owner",
								"type": "address"
							},
							{
								"name": "price",
								"type": "uint256"
							},
							{
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"name": "valid",
								"type": "bool"
							},
							{
								"name": "kind",
								"type": "uint8"
							},
							{
								"name": "IsISO",
								"type": "bool"
							}
						],
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"name": "investor",
								"type": "address"
							},
							{
								"name": "percentage",
								"type": "uint256"
							},
							{
								"name": "amount",
								"type": "uint256"
							}
						],
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getIsUsingID",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getOwnerContractList",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_TimeRanking",
				"type": "uint256"
			},
			{
				"name": "_kind",
				"type": "uint8"
			}
		],
		"name": "getRankingHistory",
		"outputs": [
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "lastWeekDownloader",
						"type": "int256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getSignerContractList",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "getSongContract",
		"outputs": [
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "songHash",
						"type": "string"
					},
					{
						"name": "contentHash",
						"type": "string"
					},
					{
						"name": "contractMoney",
						"type": "uint256"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "ownerCompensationAmount",
						"type": "uint256"
					},
					{
						"name": "ownerApproved",
						"type": "bool"
					},
					{
						"name": "signer",
						"type": "address"
					},
					{
						"name": "signerCompensationAmount",
						"type": "uint256"
					},
					{
						"name": "signerApproved",
						"type": "bool"
					},
					{
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"name": "isCancel",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeRanking",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ID",
				"type": "address"
			}
		],
		"name": "getUserList",
		"outputs": [
			{
				"components": [
					{
						"name": "ownerAddress",
						"type": "address"
					},
					{
						"name": "uploadList",
						"type": "uint256[]"
					},
					{
						"name": "downloadList",
						"type": "uint256[]"
					},
					{
						"name": "investList",
						"type": "uint256[]"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVarIdFile",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

exports.rankingABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "RankPerWeek",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileStorage",
				"type": "address"
			}
		],
		"name": "setFileStorage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_now",
				"type": "uint256"
			}
		],
		"name": "Log_RankPerWeek",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_TimeRanking",
				"type": "uint256"
			},
			{
				"name": "_kind",
				"type": "uint8"
			}
		],
		"name": "getRanking",
		"outputs": [
			{
				"components": [
					{
						"name": "idFile",
						"type": "uint256"
					},
					{
						"name": "lastWeekDownloader",
						"type": "int256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeRanking",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]