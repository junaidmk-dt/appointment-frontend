# Appointment Frontend For Users

This is the **frontend of the Appointment Booking Application for Users**, built using React and TypeScript.  
It allows users to register, login, browse service categories, view providers, and book appointments with proper validations.

## **Features**

1. **Authentication**
   
       - Login for existing users
   
       - Register form for new users
   
       - Toast notifications for success/failure of login and registration
   
       - Authentication state managed via `AuthContext.tsx`

2. **Category Browsing**

       - Displays a list of categories after successful login
   
       - Navigate to providers of selected category
   
       - Category cards displayed via `CategoryCard.tsx` component

3. **Provider Details**

       - View detailed information about a provider
   
       - Provider cards displayed via `ProviderCard.tsx`
   
       - “Book Appointment” button available on provider details page

4. **Booking Form**

       - Form to book appointments
   
       - Cannot select past dates
   
       - Time selection from current time up to 30 minutes ahead
   
       - Toast messages for successful or failed bookings

5. **Notifications**

        - Toast messages shown for all important actions (register, login, booking, errors)
   
        - Notifications handled via `NotificationContext.tsx` and `NotificationsDropdown.tsx`

6. **Protected Routes**
   
   - Certain pages are accessible only to authenticated users via `ProtectedRoute.tsx`

## **Installation & Setup**

1. **Clone the repository:**

git clone https://github.com/junaidmk-dt/appointment-frontend.git


2. **Navigate to the project folder:**

cd appointment-frontend


3. **Install dependencies:**

npm install


4. **Start the development server:**

npm start

Open the app in your browser at http://localhost:3000

5. **Usage Workflow**

=> Open the app → see Login Page.

=> If you don’t have an account → click Register to create one.

=> After login → Category Page is displayed.

=> Click a category → Provider Page for that category.

=> Click View More on a provider → Provider Details Page.

=> Click Book → open Booking Form.

=> Cannot select past dates

=> Time selection from current time up to 30 minutes ahead

=> On successful booking → show success toast

=> On failure → show error toast

=> Toast messages are also displayed for login and registration outcomes.

6. **Dependencies**

=> React

=> TypeScript

=> React Router

=> react-toastify (for toast notifications)

=> Tailwind Css
