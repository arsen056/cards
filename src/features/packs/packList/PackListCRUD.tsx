import React from 'react';
import educationIcon from '../../../assets/learn.svg'
import editIcon from '../../../assets/edit.svg'
import deleteIcon from '../../../assets/delete.svg'



const PackListCrud = () => {
    return (
        <div>

            <button>
              <img src={educationIcon} alt="education icon" />
            </button>


            <button /*onClick={editCallback}*/>
              <img src={editIcon} alt="edit icon" />
            </button>


            <button /*onClick={deleteCallback}*/>
              <img src={deleteIcon} alt="delete icon" />
            </button>


        </div>
    );
};

export default PackListCrud;