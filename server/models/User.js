import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UserRoles } from '../utils/constants.js';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    default: 'student',
  },
  subject: {
    type: String,
  },
  avatar: {
    type: String,
    required: false,
    default: '/uploads/users/parent.jpg',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  uniqueKeyForStudent: String,
  kids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pendingRequests: [
    {
      parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
    },
  ],
  lastLogin: { type: Date },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  parentName: {
    type: String,
    default: '',
  },
  teacherName: {
    type: String,
    default: '',
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.addExperience = async function (experiencePoints) {
  this.experience += experiencePoints;
  const newLevel = Math.floor(this.experience / 100) + 1;
  if (newLevel > this.level) {
    this.level = newLevel;
  }
  await this.save();
};

export default mongoose.model('User', UserSchema);
