import { useFire } from 'usefire';
import * as React from 'react';
import app from './app';

// Using authentication and firestore features
import 'firebase/firestore';
import 'firebase/auth';

// Export hooks bound to React and Firebase
export const { useFirestore, useFireauth } = useFire(React, app);
