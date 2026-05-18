
import { request } from '@playwright/test';

// ✅ Get users (public API for learning)
export async function getUsers() {
    const apiContext = await request.newContext();

    const response = await apiContext.get(
        'https://jsonplaceholder.typicode.com/users'
    );

    if (response.status() !== 200) {
        throw new Error('Failed to fetch users');
    }

    return await response.json();
    }

    // ✅ Get products from AutomationExercise API
    export async function getProducts() {
    const apiContext = await request.newContext();

    const response = await apiContext.get(
        'https://automationexercise.com/api/productsList'
    );

    if (response.status() !== 200) {
        throw new Error('Failed to fetch products');
    }

    return await response.json();
}
