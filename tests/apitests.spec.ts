
import { test, expect } from '@playwright/test'
import { getUsers } from '../utils/apiHelper'


test('Validate API structure', async () => {

    const users = await getUsers()

    expect(users.length).toBeGreaterThan(0)
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('email')
})

