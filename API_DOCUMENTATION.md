# API documentation

This project currently uses mock data stored in localStorage. The structures below map directly to how data should be modeled in Firebase Firestore when you integrate a real backend.

## Base configuration

Environment variables (see .env.example):

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Firebase config is defined in src/utils/firebase.js.

## Collections and documents

### users/{userId}

Fields:
- id (string)
- name (string)
- email (string)
- role ("teacher" | "student")
- createdAt (timestamp)

### classes/{classId}

Fields:
- id (string)
- name (string)
- subject (string)
- grade (string)
- description (string)
- ownerId (string)
- ownerName (string)
- passcode (string)
- createdAt (timestamp)

### classes/{classId}/students/{studentId}

Fields:
- studentId (string)
- studentName (string)
- joinedAt (timestamp)

### classes/{classId}/assignments/{assignmentId}

Fields:
- id (string)
- title (string)
- description (string)
- dueDate (string, YYYY-MM-DD)
- createdAt (timestamp)

### classes/{classId}/assignments/{assignmentId}/submissions/{submissionId}

Fields:
- id (string)
- studentId (string)
- studentName (string)
- content (string)
- fileName (string)
- fileSize (number)
- submittedAt (timestamp)
- grade (string)
- feedback (string)
- gradedAt (timestamp)

### classes/{classId}/assignments/{assignmentId}/submissions/{submissionId}/peerReviews/{reviewId}

Fields:
- id (string)
- reviewerId (string)
- reviewerName (string)
- content (string)
- createdAt (timestamp)

## Client-side data flow (current)

The app currently uses localStorage keys:

- reviewin_users
- reviewin_session
- reviewin_classes

When you replace localStorage with Firestore, keep the same shape for documents to minimize changes.

## Suggested Firestore operations

### Auth

- Register: create user in Firebase Auth, then create users/{userId}
- Login: sign in with Firebase Auth, fetch users/{userId}

### Class management

- Create class: add document to classes
- Join class: create classes/{classId}/students/{studentId}
- Leave class: delete classes/{classId}/students/{studentId}

### Assignment management

- Create assignment: add document in classes/{classId}/assignments
- Edit assignment: update classes/{classId}/assignments/{assignmentId}
- Delete assignment: delete classes/{classId}/assignments/{assignmentId}

### Submission management

- Submit work: add document in submissions subcollection
- Edit submission: update submission document
- Withdraw submission: delete submission document

### Grading and feedback

- Grade: update submission with grade, feedback, gradedAt

### Peer reviews

- Create peer review: add document in peerReviews subcollection

## Security rules (high level)

- Only teachers can create/update/delete classes they own.
- Students can read classes they are enrolled in.
- Students can create/update/delete their own submissions.
- Teachers can read all submissions for their classes.
- Peer reviews are writable only by the reviewer and readable by teacher + classmates.

## Integration checklist

1. Initialize Firebase app with config in src/utils/firebase.js.
2. Replace localStorage read/write with Firestore CRUD.
3. Use Firebase Auth for login/register/logout.
4. Apply security rules to enforce role-based access.
5. Replace file metadata with Firebase Storage uploads if needed.
