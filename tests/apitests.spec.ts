import { test, expect } from '@playwright/test'
import { getUsers } from '../utils/apiHelper'

test('Validate API structure', async () => {

    const users = await getUsers()

    await expect(users.length).toBeGreaterThan(0)
    await expect(users[0]).toHaveProperty('name')
    await expect(users[0]).toHaveProperty('email')
})