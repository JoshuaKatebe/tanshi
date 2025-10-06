const { sendContactEmail } = require('./src/lib/email.ts');

// Test data
const testContactData = {
  name: 'John Doe',
  email: 'john.doe@example.com', 
  phone: '+260 123 456 789',
  message: 'Service Interested In: Custom Web Development\nBudget: K25,000 - K50,000\nTimeline: 2-3 months\nCompany: Test Company Ltd\n\nMessage:\nI am interested in developing a custom e-commerce website for my business. We need features like user authentication, payment integration, and inventory management.'
};

async function testContactForm() {
  console.log('Testing contact form submission...');
  console.log('Contact data:', testContactData);
  
  try {
    const result = await sendContactEmail(testContactData);
    console.log('\n✅ Contact form test result:', result);
    
    if (result.success) {
      console.log('✅ Contact form integration is working correctly!');
    } else {
      console.log('❌ Contact form failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Contact form test failed:', error);
  }
}

testContactForm();