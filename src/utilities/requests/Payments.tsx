import axios, { AxiosResponse } from 'axios';

const Payments = async (cardholderName: string, cardNumber: string, expiryDate: string, cvv: string, fee: string): Promise<AxiosResponse | undefined > => {

  const data = {
    full_name: cardholderName,
    card_number: cardNumber,
    expiry_date: expiryDate,
    cvv: cvv,
    total_amount: fee,
    title: `subscription payment from ${cardholderName}`,
  }

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'http://localhost:8000/payments/payment-processing/', 
      data, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response;
  } catch (error) {
    console.log('Payments error:', error);
  }
}

export default Payments;