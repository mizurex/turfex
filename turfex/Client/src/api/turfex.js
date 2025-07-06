export const turfexAi = async(messages,tone)=>{
    const res = await fetch('http://localhost:3001/api/turfex', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages,tone }),
  });

  if(!res.ok){
      throw new Error('Failed to fetch from AI');
  }
  
  const data = await res.json();
  return data.answer;
}