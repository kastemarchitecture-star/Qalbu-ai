# QALBU AI - API Testing & Verification Guide

Gunakan panduan ini untuk test API sebelum dan sesudah deployment.

## 🧪 Local Testing (Before Deploy)

### Prerequisite
```bash
# Pastikan sudah punya API key
export CLAUDE_API_KEY="sk-ant-..."

# Atau set di .env.local
CLAUDE_API_KEY=sk-ant-...

# Jalankan dev server
npm run dev
# Server akan jalan di http://localhost:3000
```

### Test 1: Check if Server Running
```bash
curl http://localhost:3000
# Response: HTML dari home page
```

### Test 2: Test Chat API dengan cURL

#### Request Format:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bagaimana cara berdoa yang benar?",
    "character": "gusdur",
    "systemPrompt": "Anda adalah Gus Dur (KH Abdurrahman Wahid), tokoh intelektual Islam Indonesia.",
    "conversationHistory": []
  }'
```

#### Expected Response:
```json
{
  "response": "Gitu aja kok repot ya... Doa itu sebenarnya adalah percakapan dengan Tuhan dari hati yang tulus...",
  "character": "gusdur",
  "usage": {
    "input_tokens": 245,
    "output_tokens": 156
  }
}
```

### Test 3: Test All 6 Characters

Run the script below to test all characters:

```bash
#!/bin/bash

# Test semua karakter
CHARACTERS=("gusdur" "zainuddinmz" "caknun" "buyaarrazy" "fahrudinfahiz" "gusbaha")
TEST_MESSAGE="Bagaimana cara menghadapi kesulitan dalam hidup?"

for char in "${CHARACTERS[@]}"; do
  echo "🧪 Testing character: $char"
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d "{
      \"message\": \"$TEST_MESSAGE\",
      \"character\": \"$char\",
      \"systemPrompt\": \"Anda adalah karakter dari QALBU AI\",
      \"conversationHistory\": []
    }" \
    -w "\n✅ Status: %{http_code}\n\n"
  
  sleep 2  # Wait 2 seconds between requests
done
```

Save sebagai `test-characters.sh` dan run:
```bash
chmod +x test-characters.sh
./test-characters.sh
```

### Test 4: Test dengan Conversation History

Test jika model bisa maintain context dari conversation lama:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Terus bagaimana kalau ada yang bertanya?",
    "character": "gusdur",
    "systemPrompt": "Anda adalah Gus Dur...",
    "conversationHistory": [
      {
        "role": "user",
        "content": "Bagaimana cara berdoa?"
      },
      {
        "role": "assistant",
        "content": "Doa itu adalah percakapan dengan Tuhan dari hati yang tulus..."
      }
    ]
  }'
```

Expected: Response harusnya contextual dengan conversation sebelumnya.

### Test 5: Test Error Handling

#### Missing Required Parameter:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test"
    # Missing character, systemPrompt
  }'
```

Expected Response:
```json
{
  "error": "Missing required parameters"
}
```

#### Invalid Character:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test",
    "character": "invalid-character",
    "systemPrompt": "Test",
    "conversationHistory": []
  }'
```

Expected: 500 error or empty response (Claude tetap berjalan)

#### Invalid API Key:
```bash
# Export dengan key yang salah
export CLAUDE_API_KEY="invalid-key"
npm run dev

# Kemudian test API
# Expected: Error message tentang API key
```

## 🚀 Post-Deployment Testing (After Deploy to Bolt)

### Prerequisite
- Aplikasi sudah deployed di Bolt
- URL: `https://qalbu-ai.bolt.host` (atau custom domain)

### Test 1: Check if Server Running
```bash
curl https://qalbu-ai.bolt.host
# Should return HTML homepage
```

### Test 2: Test Chat API After Deployment

Same format sebagai lokal, tapi ganti URL:

```bash
curl -X POST https://qalbu-ai.bolt.host/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Assalamu alaikum, bagaimana kabar Anda?",
    "character": "gusdur",
    "systemPrompt": "Anda adalah Gus Dur...",
    "conversationHistory": []
  }'
```

### Test 3: Browser Testing

1. **Buka di browser**: https://qalbu-ai.bolt.host
2. **Test workflow**:
   - Halaman home muncul? ✓
   - Tombol "Mulai Chat Sekarang" bisa diklik? ✓
   - Redirect ke character selection? ✓
   - Bisa pilih karakter? ✓
   - Halaman chat muncul dengan character header? ✓
   - Bisa type message? ✓
   - Bisa tekan Enter atau klik Send? ✓
   - Response muncul? ✓
   - Response sesuai character style? ✓
   - Multiple messages working? ✓
   - Bisa ganti character? ✓

### Test 4: Mobile Responsiveness

Test di mobile browser (atau device simulator):
```bash
# Using Chrome DevTools
F12 → Toggle Device Toolbar (Ctrl+Shift+M)

Test devices:
- iPhone SE (375px width)
- iPhone 14 (390px width)
- Samsung A50 (412px width)
- iPad (768px width)
```

Checklist:
- Layout tidak broken? ✓
- Text readable? ✓
- Buttons clickable? ✓
- Chat messages wrap properly? ✓
- Input field working? ✓
- Messages scroll smoothly? ✓

### Test 5: Performance Testing

```bash
# Check response time
time curl -X POST https://qalbu-ai.bolt.host/api/chat \
  -H "Content-Type: application/json" \
  -d '{...}'

# Expected: < 5 seconds for first response
# Expected: < 3 seconds for subsequent requests
```

### Test 6: Stress Testing (Be Careful!)

Test dengan multiple concurrent requests:

```bash
#!/bin/bash

# Fire 10 requests in parallel
for i in {1..10}; do
  (curl -X POST https://qalbu-ai.bolt.host/api/chat \
    -H "Content-Type: application/json" \
    -d "{
      \"message\": \"Test request #$i\",
      \"character\": \"gusdur\",
      \"systemPrompt\": \"Test\",
      \"conversationHistory\": []
    }") &
done
wait

echo "✅ All requests completed"
```

## 📊 Test Result Checklist

### Before Deploy
- [ ] npm run dev works
- [ ] http://localhost:3000 loads
- [ ] All 6 characters respond differently
- [ ] Error handling works
- [ ] Message history preserved
- [ ] UI looks good locally

### After Deploy
- [ ] https://qalbu-ai.bolt.host loads
- [ ] Homepage displays correctly
- [ ] All characters can be selected
- [ ] Chat API responds correctly
- [ ] Response time acceptable (< 5s)
- [ ] Mobile view responsive
- [ ] No console errors in browser

### Character Authenticity Check

For each character, test dengan pertanyaan yang sama dan verifikasi responsenya unique:

#### Test Question:
```
"Bagaimana cara sukses dalam bisnis sambil tetap agama?"
```

#### Expected Character Differences:

**Gusdur** - Santai, humor, pluralism
```
"Gitu aja kok repot... Sukses itu sebenarnya adalah keseimbangan antara akhlak dan profit..."
```

**Zainudin MZ** - Energetik, memorable, rhetorical
```
"Dengarkan! Ini adalah *kunci* sukses bisnis Muslim... Pertama, niat yang benar. Kedua, amal yang jujur..."
```

**Cak Nun** - Filosofis, metafora, spiritual
```
"Bisnis adalah cermin jiwa. Ketika Anda mengejar keuntungan, sebenarnya Anda sedang mencari makna..."
```

**Buya Arrazy** - Lembut, hadis-based, spiritual
```
"Bismillah adalah awal dari setiap usaha. Hadis menceritakan bahwa Rasul sendiri berdagang dengan jujur..."
```

**Fahrudin Faiz** - Filosofis, sederhana, kritis
```
"Pertanyaan yang bagus. Filosofi bisnis Islam sebenarnya adalah tentang keseimbangan..."
```

**Gus Baha** - Santai, tafsir, humor Semarang
```
"Hehehe, ini mah mudah kok. Sukses bisnis itu ada di Quran ya... Surat al-Baqarah ayat 280..."
```

Jika semua responses berbeda → Character authenticity OK! ✅

## 🐛 Debugging Tips

### Check Browser Console
```
F12 → Console tab

Common errors:
- "Failed to fetch /api/chat" → API not responding
- "Cannot read property of undefined" → Missing environment variable
- "ERR_HTTP2_PSEUDO_HEADER_FIELD_VALUE" → CORS issue
```

### Check Network Tab
```
F12 → Network tab

Trace API call:
1. Type message, click Send
2. Look for POST request to /api/chat
3. Check Request payload
4. Check Response (should have "response" field)
5. Check timing (how long request took)
```

### Check Bolt Logs
```
Bolt Dashboard → Project → Logs

Look for:
- Build errors
- Runtime errors
- API errors
- Environment variable issues
```

### Enable Debug Mode (Local)

Add di top of `app/api/chat/route.ts`:
```typescript
console.log('=== CHAT API DEBUG ===');
console.log('Message:', message);
console.log('Character:', character);
console.log('API Key exists:', !!process.env.CLAUDE_API_KEY);
console.log('History length:', conversationHistory?.length);
```

Then check console output saat dev server running.

## 📈 Performance Optimization

### If Response is Slow

1. **Reduce max_tokens** (dalam `chat-api-route.ts`):
```typescript
max_tokens: 512,  // Reduce dari 1024
```

2. **Optimize system prompt** - lebih singkat = lebih cepat:
```typescript
// Before: 500+ karakter
// After: < 300 karakter
```

3. **Clear conversation history** - jangan store terlalu banyak:
```typescript
// Keep only last 5 messages
const limitedHistory = conversationHistory.slice(-5);
```

### If Getting Rate Limited

1. **Check quota**: https://console.anthropic.com/account/usage
2. **Wait 1 hour** untuk reset (jika pakai free tier)
3. **Upgrade plan** jika serious

## 🎯 Final Verification Checklist

```
FUNCTIONALITY:
[ ] User can select character
[ ] Chat interface loads
[ ] User can type message
[ ] Send button works
[ ] API responds
[ ] Response displays correctly
[ ] Multiple messages work
[ ] Character history maintained
[ ] Can switch characters

AUTHENTICITY:
[ ] Gusdur terasa santai & humor
[ ] Zainudin MZ energetik & rhetorical
[ ] Cak Nun filosofis & metaphorical
[ ] Buya Arrazy lembut & hadis-based
[ ] Fahrudin Faiz filosofis & educational
[ ] Gus Baha santai & tafsir-based

PERFORMANCE:
[ ] First response < 5 seconds
[ ] Subsequent responses < 3 seconds
[ ] Loading indicator shows
[ ] No errors in console

DESIGN:
[ ] Mobile responsive
[ ] Text readable
[ ] Colors match brand
[ ] Animations smooth
[ ] Layout not broken

DEPLOYMENT:
[ ] Deployed to Bolt successfully
[ ] API key set in environment
[ ] All files uploaded correctly
[ ] No 404 errors
[ ] Can access publicly
```

Semua ✅ ? Aplikasi siap untuk market testing! 🚀
