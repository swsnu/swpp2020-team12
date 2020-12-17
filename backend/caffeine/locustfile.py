from locust import HttpUser, between, task
import json


class WebsiteUser(HttpUser):
    wait_time = between(5, 15)

    def on_start(self):
        self.client.post("/api/user/signin", json.dumps({
            "username": "demo_id",
            "password": "demo_pw"
        }))

    @task
    def group_list_post(self):
        self.client.post("/api/group/", json.dumps({
            "name": "demo_group",
            "password": "pw",
            "description": "1234"
        }
        ))
        self.client.get("/api/group/")
        self.client.get("/api/group/search/1")
        self.client.post("/api/study/status/", json.dumps({"group_id": 1, "subject": "swpp"}))
        self.client.put("/api/study/status/", json.dumps({"group_id": 1}))

    @task
    def subject(self):
        self.client.get("/api/subject/")

    @task
    def stat(self):
        self.client.get("/api/statistic/2020/12")
        self.client.get("/api/statistic/2020/12/17")
        self.client.get("/api/statistic/2020/12/17/subjects")

    @task
    def rank(self):
        self.client.get("/api/rank/group/1")
        self.client.post("/api/rank/group/1")
        self.client.get("/api/rank/user")
        self.client.post("/api/rank/user")