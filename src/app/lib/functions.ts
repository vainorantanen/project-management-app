export async function sendRegisterEmail(email: string) {
    try {
      await fetch('/api/sendRegisterEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
  
      return {status: 200}
    } catch (error) {
      return {status: 400}
    }
  }