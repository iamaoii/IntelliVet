import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_auth_workflow():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # 1. Register a new user
        reg_payload = {
            "email": "testowner@example.com",
            "password": "Password123!",
            "full_name": "Test Pet Owner",
            "phone_number": "+639123456789",
            "role": "pet_owner"
        }
        res = await client.post("/api/v1/auth/register", json=reg_payload)
        assert res.status_code == 201, res.text
        data = res.json()
        assert data["email"] == "testowner@example.com"
        assert data["role"] == "pet_owner"

        # 2. Login
        login_data = {
            "username": "testowner@example.com",
            "password": "Password123!"
        }
        res_login = await client.post("/api/v1/auth/login", data=login_data)
        assert res_login.status_code == 200, res_login.text
        tokens = res_login.json()
        assert "access_token" in tokens
        token = tokens["access_token"]

        # 3. Access /me endpoint
        headers = {"Authorization": f"Bearer {token}"}
        res_me = await client.get("/api/v1/auth/me", headers=headers)
        assert res_me.status_code == 200
        me_data = res_me.json()
        assert me_data["email"] == "testowner@example.com"
        assert me_data["full_name"] == "Test Pet Owner"

