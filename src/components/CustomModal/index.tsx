import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

function CustomModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Abrir Modal</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View>
          {/* Conteúdo do seu modal aqui */}
          <Text>Seu conteúdo de modal</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Fechar Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default CustomModal;
