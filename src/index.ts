import { config } from 'dotenv';

// Initializing the dot env file very early of this project to use every where
config();

// calling app to create server :: Our logics will belong to this app.
import './app';
