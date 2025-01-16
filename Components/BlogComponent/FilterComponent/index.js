import { Modal } from "react-bootstrap";
import Select from 'react-select';
import styles from './FilterComponent.module.css';

const reactSelectStyles = {
    control: (base, state) => {
      return {
        ...base,
        borderWidth: '1px',
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderColor: '#d0d5dd',
        padding: '4px',
        borderRadius: '8px',
        height: '26px',
        alignContent: 'center',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        '&:hover': {
          borderColor: '#ACACAC',
          borderWidth: '2px',
        },
      };
    },
    dropdownIndicator: (base) => {
      return {
        ...base,
        backgroundImage:
          'https://zyod-bucket.s3.ap-south-1.amazonaws.com/1734513733616_7374_chevron-down%20%283%29.svg',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '10px',
        backgroundPosition: 'calc(100% - 10px) 50%',
        '&>svg': {
          display: 'none',
        },
        width: '16px',
        height: '8.823px',
      };
    },
    indicatorSeparator: (base) => {
      return {
        display: 'none',
      };
    },
    loadingIndicator: (base, state) => {
      return {
        ...base,
      };
    },
    indicatorsContainer: (base, state) => {
      return {
        ...base,
        width: 'auto',
        marginLeft: 'auto',
        paddingLeft: '10px',
        opacity: state.isDisabled ? '0.4' : '1',
      };
    },
    menu: (provided) => ({
      ...provided,
      height: 'fitContent',
      maxHeight: '200px',
      fontSize: '14px',
      overflowY: 'auto',
      boxShadow:
        '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
      border: '1px solid #EAECF0',
      borderRadius: '8px',
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '200px',
      overflowY: 'auto',
    }),
    valueContainer: (base, state) => {
      return {
        ...base,
        padding: 0,
        color: '#F9FAFB',
        fontSize: '14px',
      };
    },
    input: (base, state) => {
      return {
        ...base,
        padding: 0,
        margin: 0,
      };
    },
    placeholder: (base, state) => {
      return {
        ...base,
        color: '#667085',
        fontSize: '12px',
        lineHeight: '18px',
      };
    },
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#F9FAFB' : 'white', // Hover color
      padding: 10,
      fontSize: '14px',
      color: '#101828',
    }),
    clearIndicator: () => {
      return {
        position: 'relative',
        right: '0rem',
        display: 'flex',
        alignContent: 'center',
        '&>svg': {
          width: '20px',
          color: '#98A2B3',
        },
        '&>svg:hover': {
          width: '20px',
          borderRadius: '8px',
          backgroundColor: '#F9FAFB',
          color: '#667085',
        },
        '&>svg:active': {
          width: '20px',
          borderRadius: '8px',
          backgroundColor: '#98A2B3',
          boxShadow: '0px 0px 0px 2px rgba(152, 162, 179, 0.14)',
        },
      };
    },
  };

export const FilterComponent = ({
    showModal,
    setShowModal
}) => {
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        className={`${styles["modal-dialog"]} ${styles.ModalBody}`}
      >
        <div className={styles.TopHeader}>
          <div className={styles.FilterHeading}>Filters</div>
        </div>
        <div className={styles.FilterBody}>
            <div>
          <label>Section Type</label>
            <Select
                styles={reactSelectStyles}
                placeholder="Select column"
                isSearchable={true}
                options={[{label: "Football", value: "Football"}]}
            /></div>
            <div>
            <label>Genre</label>
            <Select
                styles={reactSelectStyles}
                placeholder="Select column"
                isSearchable={true}
                options={[{label: "Games", value: "Games"}]}
            /></div>
            
        </div>
        <div>
          <div className={styles.ButtonRow}>
            <button className={styles.Reset}>Reset</button>
            <button className={styles.ApplyButton}>Apply</button>
          </div>
        </div>
      </Modal>
    );
}