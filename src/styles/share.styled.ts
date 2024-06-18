import styled from 'styled-components';

export const ButtonUploadStyled = styled.div`
  input[type='file']::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #171717;
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    font-size: 12px;
    font-weight: 400;
    width: 100%;
  }

  input[type='file']::file-selector-button:hover {
    filter: brightness(0.8);
  }
`;

export const ImageUploadStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  width: 100%;
  height: 120px;
  //border: 1px solid #e0e0e0;
  //border-radius: 8px;

  .image--empty {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background: #f5f5f5;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
  }

  .image__input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    height: 100%;
  }

  .image__upload__button {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }
`;

export const FormInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 40px 0;

  .input__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
  }

  .input__list__row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  .input__list__warp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px;
  }
`;
