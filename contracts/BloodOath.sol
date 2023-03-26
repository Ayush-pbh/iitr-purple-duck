pragma solidity ^0.5.8;

contract BloodOath { 
  // variables 
  string public name = "BloodOath"; 
  
  uint public entry_count = 0;
  // Our Entries Map (kind of an array)
  mapping(uint => Entry) public entries;
  // Entry Defining
  struct Entry {   
    uint entry_index;
    string storage_hash;
    string transaction_type;
    string recv_party;
    string send_party;
  }

  event entryAdded (
    uint entry_index,
    string storage_hash,
    string transaction_type,
    string recv_party,
    string send_party
  );

  function setValue(string memory _filehash, string memory _transactiontype, string memory _recvp, string memory _sendp) public {
    // Check for empty data values
    require(bytes(_filehash).length >0);
    require(bytes(_transactiontype).length >0);
    require(bytes(_recvp).length >0);
    require(bytes(_sendp).length >0);
    
    // Add 1 to entry count
    entry_count++;
    entries[entry_count] = Entry(entry_count, _filehash, _transactiontype, _recvp, _sendp);

    // Trigger event that entry is listed
    emit entryAdded(entry_count, _filehash, _transactiontype, _recvp, _sendp);
  }
}


//stringified Json object [Whole Blood, platelets....]
//  [blue(O), yellow(A), pink(B), white(AB)]
// [A,B,O,AB]
//  [+ve,-ve]
//JSON Stringified Object [None] Or [<list of antibodies>]
//JSON Stringified Object [None] Or [<list of antibodies percentage respect to above>]
// Organization Info
//JSON OBJ  ["Name1"]->Person->Org/Org->Person || ["Name1", "Name2"] --> Org1->Org2