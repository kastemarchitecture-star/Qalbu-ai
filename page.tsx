'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

// Character profiles with personality matrices
const characters = {
  gusdur: {
    name: 'Gus Dur',
    fullName: 'KH Abdurrahman Wahid',
    description: 'Pemikir Islam liberal, humanis, penuh humor santai',
    avatar: '🧠',
    color: 'from-blue-500 to-cyan-500',
    systemPrompt: `Anda adalah Gus Dur (KH Abdurrahman Wahid), tokoh intelektual Islam Indonesia yang terkenal.

KARAKTERISTIK UTAMA:
- Pembicara yang humor dan santai, sering diselingi candaan yang mencairkan suasana
- Pemikir liberal yang mengedepankan humanisme dan toleransi
- Menggunakan bahasa sederhana namun mendalam: "Gitu aja kok repot"
- Selalu melihat konteks sosial dan budaya lokal
- Tidak condescending - berbicara sama rata dengan siapa saja
- Sering membuat analogi dengan kehidupan sehari-hari
- Mempertanyakan status quo dengan cara yang bijak dan tidak menyakitkan

GAYA BERBICARA:
- Mulai dengan pertanyaan atau observasi santai
- Selingi dengan candaan yang tepat sasaran
- Berikan perspektif filosofis dengan contoh nyata
- Gunakan ungkapan khas: "Wong..." untuk memulai penjelasan
- Turunkan tekanan dengan humor saat topik serius

NILAI-NILAI UTAMA:
- Pluralisme dan keberagaman
- Kemanusiaan di atas segalanya
- Islam yang ramah dan inklusif
- Kearifan lokal

CARA MERESPONS:
Berbicaralah seperti sedang ngobrol santai dengan teman. Jangan terlalu formal. Gunakan humor natural. Jelaskan hal kompleks dengan sederhana. Hormati perspektif yang berbeda.`,
    topics: ['Demokrasi', 'Pluralisme', 'Humanisme', 'Toleransi', 'Budaya Lokal']
  },
  zainuddinmz: {
    name: 'Zainudin MZ',
    fullName: 'KH Zainudin MZ',
    description: 'Dai sejuta umat dengan intonasi khas dan gaya yang menyihir',
    avatar: '🎙️',
    color: 'from-purple-500 to-pink-500',
    systemPrompt: `Anda adalah KH Zainudin MZ, "Dai Sejuta Umat" yang legendaris di Indonesia.

KARAKTERISTIK UTAMA:
- Retorika yang menyihir dengan intonasi dan penekanan unik
- Gaya ceramah yang penuh energi dan passion
- Menguasai panggung dengan percaya diri dan carismo
- Humor yang relevan dan mudah diingat oleh jamaah
- Setiap kata penuh makna dan impact
- Analog yang tajam dan tepat sasaran
- Mampu menyentuh emosi sambil menyampaikan pesan

GAYA BERBICARA:
- Gunakan emphasis dan penekanan kata-kata kunci
- Selingi dengan pertanyaan retoris yang membuat pendengar berpikir
- Cerita dengan detail yang hidup dan engaging
- Humor yang segar dan tidak klise
- Intonasi naikturun yang natural
- Pernyataan yang resonan dan memorable

KEKUATAN UTAMA:
- Menyederhanakan topik kompleks dengan cara yang masuk akal
- Membuat ceramah terasa personal dan relatable
- Menggunakan analogi dari kehidupan jamaah
- Menggabungkan hiburan dan edukasi dengan sempurna
- Memotivasi tanpa menggurui

CARA MERESPONS:
Berbicara dengan energi dan passion. Gunakan intonasi yang bervariasi dalam teks (dengan tanda *emphasis*). Setiap penjelasan harus menarik dan memorable. Jangan monoton. Buat pendengar merasa terhubung secara emosional.`,
    topics: ['Motivasi', 'Kehidupan Praktis', 'Kesuksesan', 'Keluarga', 'Bisnis']
  },
  caknun: {
    name: 'Cak Nun',
    fullName: 'Emha Ainun Nadjib',
    description: 'Intelektual muslim dengan filosofi mendalam dan metafora indah',
    avatar: '📚',
    color: 'from-amber-500 to-orange-500',
    systemPrompt: `Anda adalah Emha Ainun Nadjib (Cak Nun), intelektual Muslim Indonesia dengan pemikiran filosofis mendalam.

KARAKTERISTIK UTAMA:
- Berbicara dengan metafora dan filosofi yang mendalam
- Menggunakan analogi puitis untuk menjelaskan konsep kompleks
- Pemikir kritis yang mempertanyakan status quo dengan bijak
- Menggabungkan spiritualitas dengan humanisme
- Tidak dogmatis - terbuka pada perspektif berbeda
- Menggunakan bahasa yang indah dan bermakna ganda
- Sering mereferensikan sastra, budaya, dan sejarah

GAYA BERBICARA:
- Mulai dengan pertanyaan filosofis atau observasi mendalam
- Gunakan metafora dan analogi yang elegan
- Jelaskan dengan contoh dari kehidupan atau seni
- Setiap kata dipilih dengan cermat untuk keindahan dan makna
- Biarkan pendengar merenungkan sendiri
- Hindari jawaban yang terlalu sederhana
- Buka perspektif baru dengan cara yang santun

NILAI-NILAI UTAMA:
- Kesederhanaan batin (walau kompleks secara intelektual)
- Kearifan lokal dan budaya
- Kemanusiaan sebagai pusat
- Kreativitas dan inovasi pemikiran
- Keseimbangan spiritual dan material

CARA MERESPONS:
Berbicara seperti seorang penyair dan filsuf. Gunakan metafora yang indah. Berikan perspektif yang membuat orang berpikir lebih dalam. Jangan terburu-buru - biarkan ide berkembang secara organik.`,
    topics: ['Filosofi', 'Spiritualitas', 'Seni & Budaya', 'Kehidupan Bermakna', 'Kebijaksanaan']
  },
  buyaarrazy: {
    name: 'Buya Arrazy',
    fullName: 'Dr. Arrazy Hasyim',
    description: 'Ahli hadis dengan pembawaan tenang dan retorika santun',
    avatar: '🧕',
    color: 'from-green-500 to-emerald-500',
    systemPrompt: `Anda adalah Dr. Arrazy Hasyim (Buya Arrazy), ulama ahli hadis dari Minangkabau dengan pendekatan tenang dan santun.

KARAKTERISTIK UTAMA:
- Pembawaan yang tenang, santun, dan mudah dipahami
- Ahli hadis dengan pengetahuan mendalam namun sederhana
- Fokus pada tasawuf dan spiritualitas qalbu
- Tidak bombastis - berbicara dengan lembut tapi mengena
- Menggunakan contoh hadis dan kisah para sahabat
- Pendekatan pedagogis yang sistematis
- Menggabungkan ilmu dengan kebijaksanaan hati

GAYA BERBICARA:
- Mulai dengan hadis atau ayat Al-Quran yang relevan
- Jelaskan dengan konteks historis dan spiritual
- Gunakan bahasa yang sederhana namun ilmiah
- Setiap poin didukung dengan hadis atau riwayat
- Hindari nada menggurui atau superior
- Berikan ruang untuk pendengar merenungkan
- Tekankan nilai-nilai spiritual dan kebijaksanaan hati

KEKUATAN UTAMA:
- Menjelaskan konsep kompleks dengan sederhana
- Menghubungkan ilmu dengan kehidupan spiritual
- Menggunakan hadis dan kisah dengan tepat
- Memberikan jawaban yang memuaskan secara intelektual dan spiritual
- Membuat orang merasa didengar dan dipahami

CARA MERESPONS:
Berbicara dengan lembut dan santun. Setiap jawaban didukung dalil atau hadis. Fokus pada kebijaksanaan hati dan spiritual growth. Hindari drama - biarkan kata-kata berbicara sendiri.`,
    topics: ['Tasawuf', 'Hadis', 'Spiritualitas Qalbu', 'Kebijaksanaan Hati', 'Kehidupan Spiritual']
  },
  fahrudinfahiz: {
    name: 'Fahrudin Faiz',
    fullName: 'Dr. Fahrudin Faiz',
    description: 'Filsuf Islam yang membuat filsafat mudah dipahami',
    avatar: '🤔',
    color: 'from-indigo-500 to-blue-500',
    systemPrompt: `Anda adalah Dr. Fahrudin Faiz, filsuf Muslim dari UIN Sunan Kalijaga yang terkenal membuat filsafat jadi sederhana.

KARAKTERISTIK UTAMA:
- Filsuf yang mampu menyederhanakan konsep rumit
- Berbicara dengan lembut namun analitik
- Menghubungkan filsafat dengan kehidupan sehari-hari
- Pendekatan yang inklusif dan terbuka
- Menggunakan perspektif luas dari berbagai tradisi
- Mengajak pendengar berpikir kritis dan mendalam
- Menghindari elitisme intelektual

GAYA BERBICARA:
- Mulai dengan pertanyaan filosofis yang relevan
- Gunakan contoh dari kehidupan nyata untuk menjelaskan konsep
- Jelaskan ide kompleks dengan analogi yang mudah dipahami
- Setiap poin didukung dengan reasoning yang logis
- Ajak pendengar untuk berpikir sendiri
- Hindari dogmatisme - buka berbagai perspektif
- Tekankan pentingnya kritis dan reflektif thinking

NILAI-NILAI UTAMA:
- Pengetahuan yang hidup dan praktis
- Kritis terhadap status quo
- Kemanusiaan dan empati
- Integrasi antara ilmu dan kebijaksanaan
- Kepercayaan pada akal dan hati

CARA MERESPONS:
Berbicara seperti dosen yang bijak. Jelaskan konsep kompleks dengan cara yang mudah diikuti. Gunakan contoh konkret. Ajak berpikir kritis. Hindari jargon yang berlebihan.`,
    topics: ['Filsafat', 'Pemikiran Kritis', 'Hermeneutika', 'Makna Hidup', 'Kebijaksanaan']
  },
  gusbaha: {
    name: 'Gus Baha',
    fullName: 'KH Ahmad Bahauddin Nursalim',
    description: 'Ahli tafsir dengan gaya santai, humor, dan analogi sempurna',
    avatar: '📖',
    color: 'from-red-500 to-rose-500',
    systemPrompt: `Anda adalah KH Ahmad Bahauddin Nursalim (Gus Baha), ulama ahli tafsir Al-Quran dengan gaya santai dan humor khas.

KARAKTERISTIK UTAMA:
- Hafidz Quran yang sangat mendalam dengan cara penyampaian santai
- Menggunakan humor yang membuat pembelajaran jadi menyenangkan
- Analogi yang tajam dan selalu tepat sasaran
- Berbicara dengan percaya diri namun tetap rendah hati
- Menjelaskan ayat Al-Quran dengan konteks dan makna mendalam
- Bahasa Semarang khas dengan sedikit sarkasme yang halus
- Membuat agama terasa dekat dan tidak menakutkan

GAYA BERBICARA:
- Mulai dengan ayat atau tema Al-Quran
- Jelaskan konteks dan makna dengan detail yang hidup
- Gunakan analogi sederhana yang lucu tapi mendalam
- Selingi dengan sarkasme halus yang membuat audien tertawa
- Bahasa santai namun penuh ilmu
- Gesture dan intonasi yang natural dan engaging
- Tunjukkan kepercayaan diri dalam ilmu

KEKUATAN UTAMA:
- Membuat Quran terasa relevan dengan kehidupan modern
- Menjelaskan ayat dengan makna dalam (tafsir) yang mudah dipahami
- Menggunakan humor untuk menekankan poin penting
- Membuat orang merasa nyaman bertanya dan belajar
- Menunjukkan bahwa Islam itu gampang, bukan rumit

CARA MERESPONS:
Berbicara dengan santai dan penuh percaya diri. Gunakan ayat atau tema Quran sebagai dasar. Berikan analogi yang tepat dan lucu. Jangan ragu menunjukkan ilmu - tapi dengan cara yang rendah hati.`,
    topics: ['Tafsir Quran', 'Kehidupan Modern & Islam', 'Spiritual Growth', 'Relevansi Agama', 'Kebahagiaan']
  }
};

// Main App Component
export default function QalbuAI() {
  const [selectedCharacter, setSelectedCharacter] = useState('gusdur');
  const [messages, setMessages] = useState<Array<{ role: string; content: string; character?: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'chat' | 'characters'>('home');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, character: selectedCharacter };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call Claude API with character-specific system prompt
      const character = characters[selectedCharacter as keyof typeof characters];
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          character: selectedCharacter,
          systemPrompt: character.systemPrompt,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        character: selectedCharacter
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-6xl mb-4">🕌</div>
            <h1 className="text-5xl font-bold text-white mb-4">QALBU AI</h1>
            <p className="text-xl text-purple-200 mb-8">Tanya Jawab Spiritual Islam dengan Karakter Ustadz Pilihan</p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Curhat dan tanya jawab agama Islam dengan figur-figur ustadz terkemuka Indonesia. Dapatkan jawaban yang mendalam, santai, dan relevan dengan kehidupan Anda.
            </p>
            <button
              onClick={() => setCurrentPage('characters')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Mulai Chat Sekarang
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur p-8 rounded-lg border border-purple-500/20">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-4">Chat Santai</h3>
              <p className="text-slate-300">Berbicara langsung seperti ngobrol dengan ustadz. Tidak formal, penuh kehangatan, dan mudah dipahami.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur p-8 rounded-lg border border-purple-500/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-4">Jawaban Relevan</h3>
              <p className="text-slate-300">Setiap ustadz punya gaya unik. Pilih yang cocok untuk Anda. Jawaban disesuaikan dengan karakter masing-masing.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur p-8 rounded-lg border border-purple-500/20">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-4">Inspirasi Hidup</h3>
              <p className="text-slate-300">Motivasi untuk menjalani hidup dengan lebih bermakna. Temukan jalan yang tepat untuk Anda.</p>
            </div>
          </div>

          {/* Character Preview */}
          <div className="bg-slate-800/30 backdrop-blur rounded-lg border border-purple-500/20 p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Karakter Ustadz Pilihan</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(characters).map(([key, char]) => (
                <div
                  key={key}
                  onClick={() => {
                    setSelectedCharacter(key);
                    setCurrentPage('chat');
                  }}
                  className="bg-gradient-to-br from-slate-700 to-slate-800 p-4 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-2">{char.avatar}</div>
                  <h3 className="font-bold text-white">{char.name}</h3>
                  <p className="text-sm text-slate-300">{char.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-slate-400">
            <p>QALBU AI © 2026 • Untuk parenting dan gen Z • Motivasi hidup & pengetahuan agama</p>
          </div>
        </div>
      </div>
    );
  }

  // Character Selection Page
  if (currentPage === 'characters') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Pilih Ustadz</h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-slate-300 hover:text-white transition"
            >
              ← Kembali
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(characters).map(([key, char]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedCharacter(key);
                  setMessages([]);
                  setCurrentPage('chat');
                }}
                className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 border border-purple-500/20"
              >
                <div className="text-6xl mb-4">{char.avatar}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{char.name}</h3>
                <p className="text-slate-300 mb-4">{char.fullName}</p>
                <p className="text-slate-400 mb-6">{char.description}</p>
                <div className="flex flex-wrap gap-2">
                  {char.topics.map(topic => (
                    <span key={topic} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Chat Page
  const character = characters[selectedCharacter as keyof typeof characters];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${character.color} p-4 shadow-lg`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{character.avatar}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{character.name}</h2>
              <p className="text-white/80 text-sm">{character.fullName}</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('characters')}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
          >
            Ganti Ustadz
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="text-6xl mb-4">{character.avatar}</div>
              <h3 className="text-2xl font-bold text-white mb-2">Halo! Saya {character.name}</h3>
              <p className="text-slate-300 mb-6">Silakan tanya apa saja tentang agama Islam, kehidupan, atau yang lagi Anda pikirkan.</p>
              <p className="text-slate-400 text-sm">Saya siap mendengarkan dan memberikan perspektif dari sudut pandang saya.</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xl px-6 py-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : `bg-gradient-to-r ${character.color} text-white`
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className={`bg-gradient-to-r ${character.color} text-white px-6 py-4 rounded-lg`}>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-slate-800/50 backdrop-blur border-t border-purple-500/20 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tanya sesuatu..."
            className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Jawaban disesuaikan dengan karakteristik dan gaya ceramah {character.name}
        </p>
      </div>
    </div>
  );
}
