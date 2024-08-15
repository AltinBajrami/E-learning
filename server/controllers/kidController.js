import Kid from '../models/Kid.js';

export const getKids = async (req, res) => {
  try {
    const kids = await Kid.find();
    res.json(kids);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const createKid = async (req, res) => {
  const { name, age, class: kidClass, tasks } = req.body;

  const newKid = new Kid({
    name,
    age,
    class: kidClass,
    tasks,
  });

  try {
    await newKid.save();
    res.status(201).json(newKid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};