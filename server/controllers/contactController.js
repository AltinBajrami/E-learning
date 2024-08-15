import Contact from '../models/Contact.js';
import { StatusCodes } from 'http-status-codes';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const contact = await Contact.create({ name, email, description });
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Contact form submitted successfully', contact });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to submit contact form' });
  }
};

export const getAllSubmittedContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(StatusCodes.OK).json({ contacts });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch contacts' });
  }
};
