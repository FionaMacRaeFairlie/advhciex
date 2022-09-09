import React, {useState} from 'react';
import Modal from 'react-modal';

function PlanTripPopup (props){

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }
console.log(props.hostels);
props.hostels.map(item => {
    console.log(" item :",item.name)
    console.log(" item location:",item.location)
    return (
         <p>{item.name}</p>  
    )    
  })



    return(
        <>
            <button onClick={setModalIsOpenToTrue}>Plan Trip</button>

            <Modal isOpen={modalIsOpen}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <p>{props.hostels.map(item => {
    console.log(" item :",item.name)
    console.log(" item location:",item.location)
    return (
         <p>{item.name}</p>  
    )    
  })}</p>
            </Modal>
        </>
    )
}
export default PlanTripPopup ;