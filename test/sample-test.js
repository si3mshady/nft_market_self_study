const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MentalHealthMarket", function () {
  
  it("Generate Medical Appointments using QRC codes ", async function () {
    const MentalHealthMarket = await ethers.getContractFactory("MentalHealthMarket");
    const mhm = await MentalHealthMarket.deploy();
    await mhm.deployed();

    const marketAddress = mhm.address

    const ElDigitalAsset = await ethers.getContractFactory("ElDigitalAsset");
    const eda = await ElDigitalAsset.deploy(marketAddress);
    await eda.deployed();

    const nftAddress = eda.address 

    let listingPrice = await mhm.getListingPrice()
    listingPrice = listingPrice.toString()


    const auctionPrice =  ethers.utils.parseUnits('.0001' ,'ether')

    await eda.createToken('https://ipfs.infura.io/ipfs/QmaSKc7s2dDYg1Pc3EfQ3L8NK4NM1yuTdKxhbqFUqpij1T')
    await eda.createToken('https://ipfs.infura.io/ipfs/QmaSKc7s2dDYg1Pc3EfQ3L8NK4NM1yuTdKxhbqFUqpij1T')
    await eda.createToken('https://ipfs.infura.io/ipfs/QmaSKc7s2dDYg1Pc3EfQ3L8NK4NM1yuTdKxhbqFUqpij1T')
    await eda.createToken('https://ipfs.infura.io/ipfs/QmaSKc7s2dDYg1Pc3EfQ3L8NK4NM1yuTdKxhbqFUqpij1T')
   
    await mhm.createNewListing(nftAddress, 1, 16490197, 5,auctionPrice, {value: listingPrice})
    await mhm.createNewListing(nftAddress, 2, 888, 5,auctionPrice, {value: listingPrice})
    await mhm.createNewListing(nftAddress, 3, 6545646, 5,auctionPrice, {value: listingPrice})
    await mhm.createNewListing(nftAddress, 4, 6545646, 5,auctionPrice, {value: listingPrice})

    const [_,testAcc1, testAcc2] = await ethers.getSigners()


    await mhm.connect(testAcc1).createMarketSale(nftAddress,1 , {value: auctionPrice})
    

    let appts = await mhm.getAllAppts()

    

    appts = await Promise.all(appts.map(async (i,index) => {

        let tokenURI = await eda.tokenURI(i.nftTokenId)

        // console.log(i)

        let items = {

          apptId: i.apptId.toString(),
          epochTime: i.epochTime.toString(),
          appointmentType: i.appointmentType.toString(),
          fee: i.fee.toString(),
          nftTokenId: i.nftTokenId.toString(),
          tokenURI
          
        }
        return items
        
    }
        
    ))
    
console.log(appts)
   
  });
});
