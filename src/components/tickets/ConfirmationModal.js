import './ConfirmationModal.css'; 

const ConfirmationModal = ({ children, onConfirm, onCancel }) => {
  return (
    <div className='confirmation-modal'>
      <div className='confirmation-modal-content'>
        {children}
        <div className='confirmation-modal-buttons'>
          <button onClick={onConfirm} className='confirmation-modal-yes'>Yes</button>
          <button onClick={onCancel} className='confirmation-modal-no'>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
