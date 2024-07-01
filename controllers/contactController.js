const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("please fill all fields");
  } else {
    try {
      const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
      });
      res.status(201).json(contact);
    } catch (err) {
      console.log(err);
    }
  }
});

//@desc Get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found!");
  }
  res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user is not audthorized to update other contacts ");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
  if (!contact) {
    res.status(404);
    throw new Error("contact not found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user is not authorized to update other contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

// practice for contact update
// not for live executions
const updatedContact = asyncHandler(async (req, res) => {
  const contact1 = await Contact.findById(req.params.id);
  if (!contact1) {
    res.statusMessage(404);
    throw new Error("not a valid contact");
  }
  if (contact.user_id.toString() !== req.params.id) {
    res.statusMessage(403);
    throw new Error("user not authorized to update contacts");
  }
  const updateddContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateddContact);
});

// end practice

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
