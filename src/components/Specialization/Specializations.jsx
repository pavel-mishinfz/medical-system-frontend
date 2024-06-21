import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import SpezializationItem from './SpezializationItem';
import Button from '../Button/Button';


const initQuantity = 8;

const Spezializations = () => {
    const [quantity, setQuantity] = useState(initQuantity);
    const [specializationsList, setSpecializationsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://'+ window.location.hostname + ':5000/specializations');
                setSpecializationsList(response.data);
            } catch(error) {
                console.error('Get Spezializations Error:', error);
            }
        };
        
        fetchData();
    }, []);  

    const specializationsPiece = useMemo(() => {
        return specializationsList.slice(0, quantity);
    }, [quantity, specializationsList]);


  return (
    <div className="direct">
        {specializationsPiece.length > 0 && (
        <>
        <div className="direct__header">
            <h2 className="direct__h2">Специализации</h2>
        </div>
        <div className="direct__list">
            {specializationsPiece.map(spezialization => 
            <SpezializationItem key={spezialization.id} data={spezialization}/>
            )}
        </div>
        {specializationsPiece.length !== specializationsList.length ? 
        <Button text={'Показать все'} onHandleClick={() => setQuantity(specializationsList.length)}/>
        :
        <Button text={'Свернуть'} onHandleClick={() => setQuantity(initQuantity)}/>
        }
        </>
        )}
    </div>
  );
}

export default Spezializations