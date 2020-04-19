import asyncio


async def fetch(url, session):
    async with session.get(url) as response:
        return await response.text()


async def get_page_contents(session, urls):
    tasks = []
    for url in urls:
        task = fetch(url, session)
        tasks.append(task)
    responses = await asyncio.gather(*tasks)
    return responses
