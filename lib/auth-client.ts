"use client"

export async function loginUser(email: string, password: string): Promise<boolean> {
  try {
    // Make sure we're calling the correct endpoint
    const response = await fetch('/api/auth/login-admin-control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important for cookies
    });

    if (!response.ok) {
      console.error('Login failed with status:', response.status);
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
}

export async function registerUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error registering:', error);
    return false;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }
    
    // After successful logout, redirect to the home or login page
    window.location.href = '/login-admin-control';
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
}