from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    name = "Safwan"
    return {"message": "Hello " + name}
