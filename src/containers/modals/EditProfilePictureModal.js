import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { Modal, Input, Button } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';
import { closeModal } from '../../actions/modal';

const EditProfilePictureModal = ({ onClose, picture, setPicture, scale, setScale }) => {
  let imageEditor;
  const onSaveClick = () => {
    const image = imageEditor.getImage().toDataURL();
    fetch(image)
      .then(res => res.blob())
      .then(blob => console.log(URL.createObjectURL(blob)));
  };
  return (
    <Modal
      dimmer="blurring"
      size="tiny"
      closeIcon
      open
      onClose={onClose}
    >
      <Modal.Header>
      Edit Profile Picture
      </Modal.Header>
      <Modal.Content>
        {picture &&
        <AvatarEditor
          ref={(node) => { imageEditor = node; }}
          image={picture}
          width={500}
          height={500}
          border={0}
          borderRadius={250}
          scale={scale}
        />}
        <input name="file" type="file" onChange={e => setPicture(URL.createObjectURL(e.target.files[0]))} />
        {picture && scale}
        {picture && <Input type="range" min={1} max={3} step={0.1} onChange={(e, { value }) => setScale(value)} />}
        <Button onClick={onSaveClick}>Save</Button>
      </Modal.Content>
    </Modal>
  );
};

EditProfilePictureModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  setPicture: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  setScale: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal())
});

const enhance = compose(
  withState('picture', 'setPicture', undefined),
  withState('scale', 'setScale', 1),
  connect(null, mapDispatchToProps)
);

export default enhance(EditProfilePictureModal);
