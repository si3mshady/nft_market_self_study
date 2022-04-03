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


    const auctionPrice =  ethers.utils.parseUnits('100' ,'ether')

    await eda.createToken('http://www.elliott1.com')
    await eda.createToken('http://www.elliott2.com')

    await mhm.createNewListing(nftAddress, 1, 'Tuesday', 'Screening',auctionPrice, {value: listingPrice})
    await mhm.createNewListing(nftAddress, 2, 'Friday', 'Screening',auctionPrice, {value: listingPrice})

    const [_,testAcc1, testAcc2] = await ethers.getSigners()


    await mhm.connect(testAcc1).createMarketSale(nftAddress,1 , {value: auctionPrice})

    const appts = await mhm.getListedAppointments()

    console.log('appts',appts)

   
  });
});
