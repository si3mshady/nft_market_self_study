pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MentalHealthMarket is ReentrancyGuard {

        using Counters for Counters.Counter;
        Counters.Counter public _appointmentId;
        Counters.Counter public _appointmentsCreated;
        Counters.Counter public _appointmentsScheduled;
  
        
        // Appointment[] public appointmentList;
        // Appointment[] public nonScheduledAppt;

        address payable owner; // owner will collect listing fees for appoitnemtns registered 
        uint256 listingPrice = 0.01 ether;
       
        constructor() {  owner = payable( msg.sender);  }

        mapping(uint256 => Appointment) private idToAppointment;

        event ApptListingCreated ( 
            address nftContract,
            uint256 nftTokenId,

            uint apptId, 
            address providerWallet,
            uint256 epochTime, 
            uint256 appointmentType, 
           
            uint fee,
            bool scheduled
            
        );

        struct Appointment 
        
        { 
            address nftContract;
            uint256 nftTokenId;
            uint apptId; 
            address payable providerWallet;
            uint256 epochTime; 
            uint256 appointmentType; 
            address payable patientWallet; 
            uint fee;
            bool scheduled;
            
        }

        function getListingPrice() public view returns (uint256) {
            return listingPrice;
        }

        function createNewListing( 
            address nftContract,
            uint256 nftTokenId,
            uint256  epochTime, 
            uint256  appointmentType, 
           
            // address patientWallet,
            uint fee

        ) 
        
        public payable nonReentrant {
            require(fee > 0, "Fee can not be zero");
            require(msg.value == listingPrice, "Price must equal listing price" );

            _appointmentId.increment();
            uint256 apptId = _appointmentId.current();

            idToAppointment[apptId] = Appointment(
            nftContract,
            nftTokenId,
            apptId,
            payable(msg.sender),
            epochTime, 
            appointmentType, 
            
            payable(address(0)),
            fee,
            true
            );

            IERC721(nftContract).transferFrom(msg.sender,address(this), nftTokenId);
            // transfer the ownership of token to marketplace 
            // contract can then transfer to a new buyer once a tx is made
            _appointmentsCreated.increment();
            emit ApptListingCreated(nftContract, nftTokenId, apptId, payable(msg.sender), 
            epochTime, appointmentType,  fee, false);
            
        }

        function createMarketSale(
            address nftContract,
            uint256 apptId
        
        ) public payable nonReentrant {

            uint256 fee = idToAppointment[apptId].fee;
            uint256 nftTokenId = idToAppointment[apptId].nftTokenId;
            require(msg.value == fee,"Please submit the providers fee before purchasing the token");


            idToAppointment[apptId].providerWallet.transfer(msg.value);
            //the buyer (msg.sender) will have to indicate msg.value for tx which will be transfered to the 
            // providersWallet 
            //transfer ownership from marketplace to buyer (transferring the digital good)
            IERC721(nftContract).transferFrom(address(this),msg.sender, nftTokenId);
            idToAppointment[apptId].patientWallet = payable(msg.sender);
            idToAppointment[apptId].scheduled = true;
            _appointmentsScheduled.increment();
            payable(owner).transfer(listingPrice);
        }

        function getListedAppointments() public view  returns (Appointment[] memory) {
                 uint currentAppointmentListings =  _appointmentsCreated.current();
                 uint unscheduledAppts = _appointmentsCreated.current() - _appointmentsScheduled.current();
                 uint localIndex = 0;

                 Appointment[] memory appointments = new Appointment[](unscheduledAppts);

                 for (uint i = 0; i < currentAppointmentListings; i++) {
                     if (idToAppointment[i + 1].patientWallet == address(0)) {

                            uint currentApptId = idToAppointment[i + 1].apptId;
                            Appointment storage currentAppt = idToAppointment[i + 1];
                                appointments[localIndex] = currentAppt;
                                localIndex +=1;

                     }

                   
                       return appointments;
                 }
               
        }

        function fetchMyScheduledAppointments() public view returns (Appointment[] memory){
            uint currentAppointmentListings =  _appointmentsCreated.current();
            uint matches = 0;
            uint localIndex = 0;
            for (uint i = 0; i < currentAppointmentListings; i++) {
                     if (idToAppointment[i + 1].patientWallet == msg.sender) {
                            matches += 1;
                     }
        }
        Appointment[] memory appointments = new Appointment[](matches);


                 for (uint i = 0; i < currentAppointmentListings; i++) {
                     if (idToAppointment[i + 1].patientWallet == msg.sender) {

                                uint currentApptId = idToAppointment[i + 1].apptId;
                                Appointment storage currentAppt = idToAppointment[currentApptId];
                                appointments[localIndex] = currentAppt;
                                localIndex +=1;
                     }
                     return appointments;
                                           
                 }
       
}


function fetchProviderListingOfAppointments() public view returns (Appointment[] memory){
            uint currentAppointmentListings =  _appointmentsCreated.current();
            uint matches = 0;
            uint localIndex = 0;
            for (uint i = 0; i < currentAppointmentListings; i++) {
                     if (idToAppointment[i + 1].providerWallet == msg.sender) {
                            matches += 1;
                     }
        }
        Appointment[] memory appointments = new Appointment[](matches);


                 for (uint i = 0; i < currentAppointmentListings; i++) {
                     if (idToAppointment[i + 1].providerWallet == msg.sender) {

                                uint currentApptId = idToAppointment[i + 1].apptId;
                                Appointment storage currentAppt = idToAppointment[currentApptId];
                                appointments[localIndex] = currentAppt;
                                localIndex +=1;
                     }
                     return appointments;
                                           
                 }
       
}

}