// Send quote email using Resend API
export const sendQuoteEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  packageData: any;
  businessSummary?: string;
  projectGoals?: string;
  contactMethod: string;
  referralCode?: string;
}) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'quote',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        packageData: formData.packageData,
        businessSummary: formData.businessSummary,
        projectGoals: formData.projectGoals,
        contactMethod: formData.contactMethod,
        referralCode: formData.referralCode
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

// Send contact email using Resend API
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

// Backwards compatibility - keep the old interface for existing code
interface EmailData {
  orderID: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  totalPrice: number;
  extraPages?: number;
  addons?: string[];
  maintenance?: number;
  businessSummary?: string;
  projectGoals?: string;
  contactMethod?: string;
  referrerName?: string;
}

export async function sendQuoteConfirmationEmail(data: EmailData) {
  return sendQuoteEmail({
    name: data.clientName,
    email: data.clientEmail,
    packageData: {
      name: data.packageName,
      price: data.totalPrice,
      extraPages: data.extraPages,
      addons: data.addons,
      maintenance: data.maintenance
    },
    businessSummary: data.businessSummary,
    projectGoals: data.projectGoals,
    contactMethod: data.contactMethod || 'Email',
    referralCode: data.referrerName
  });
}

export async function sendAdminNotificationEmail(data: EmailData) {
  return sendQuoteEmail({
    name: data.clientName,
    email: data.clientEmail,
    packageData: {
      name: data.packageName,
      price: data.totalPrice,
      extraPages: data.extraPages,
      addons: data.addons,
      maintenance: data.maintenance
    },
    businessSummary: data.businessSummary,
    projectGoals: data.projectGoals,
    contactMethod: data.contactMethod || 'Email',
    referralCode: data.referrerName
  });
}
