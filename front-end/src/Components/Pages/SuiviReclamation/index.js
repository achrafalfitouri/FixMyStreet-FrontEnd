import React, { useState } from 'react';
import { Form, Input, Button, Descriptions, message } from 'antd';
import axios from 'axios';

const SuiviReclamation = () => {
  const [reclamationData, setReclamationData] = useState(null);

  const onFinish = async (values) => {
    // Extract numeric ID from the input
    const numericId = values.numeroReclamation.replace(/^Rec-/, '');

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/reclamations/${numericId}`);
      setReclamationData(response.data);
    } catch (error) {
      console.error('Error fetching reclamation:', error.response || error);
      message.error("Une erreur s'est produite lors de la récupération de la réclamation.");
    }
  };

  const renderReclamationDetails = () => {
    if (!reclamationData) {
      return null;
    }

    return (
      <Descriptions title={`Réclamation numéro: Rec-${reclamationData.id}`} bordered column={1}>
        <Descriptions.Item label="Type de réclamation">{reclamationData.Type}</Descriptions.Item>
        <Descriptions.Item label="Status">{reclamationData.status}</Descriptions.Item>
        <Descriptions.Item label="Description">{reclamationData.Description}</Descriptions.Item>
        {/* Add other reclamation details as needed */}
      </Descriptions>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: 800, padding: 24, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 8 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Suivi de Réclamation</h1>
        
        <Form
          name="suiviReclamationForm"
          onFinish={onFinish}
          initialValues={{ numeroReclamation: '' }}
          layout="vertical"
          style={{ marginBottom: 24 }}
        >
          <Form.Item
            label="Numéro de Réclamation"
            name="numeroReclamation"
            rules={[{ required: true, message: 'Veuillez entrer le numéro de réclamation!' }]}
          >
            <Input placeholder="Entrez le numéro de réclamation au format Rec-{id}" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Rechercher
            </Button>
          </Form.Item>
        </Form>

        {reclamationData && renderReclamationDetails()}
      </div>
    </div>
  );
};

export default SuiviReclamation;
