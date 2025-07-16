export const turfexAi = async(messages,tone,length,level,language)=>{
    const res = await fetch('https://turfex-5.onrender.com/api/turfex', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages,tone,length,level,language}),
  });

  if(!res.ok){
      throw new Error('Failed to fetch from AI');
  }
  
  const data = await res.json();
  return data.answer;
}