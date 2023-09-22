# wordlegame.v2

----------TR----------

Son zamanlarda internette oldukça meşhur olan wordle oyununu öğrenme projesi olarak dizayn ettim. 
HTML CSS ve JavaScript kodları tamamıyla bana aittir
Kelimeleri api servisi ile çekmek mümkğn olsa da api sunucusunun kelimeleri çektiği database'e erişim sağlayamadığımdan ötürü kelimeleri lokal txt dosyalar halinde çektim. Girilen kelimenin database'de bulunmaması halinde input geçerli sayılmayacaktır. İngilizce database olarak 5 harfli kelimeler internetten buldum. Henüz aktif olmayan ama dosyalarda bulunan türkçe kelime datası ise tüm türkçe kelimeleri içeren bir database'den, 5 harfli kelimeleri node.js kullanarak tekrar düzenledim. Henüz kelimeler yeterince optimal olmadığı için oyuna eklemedim.

Proje responsive olarak tasarlanmamıştır. Telefonlarda ve diğer küçük ekranlarda optimal çalışmaz.

Kazanç durumunu test etmek için sağ ütte adımı içeren butona 10 kez tıklayabilirsiniz. Buton içeriği ceveaba dönüşecektir.



----------ENG----------

I have designed a project to learn the Wordle game, which has become quite famous on the internet recently. The HTML, CSS, and JavaScript codes are entirely my own.

Although it is possible to fetch words using an API service, I couldn't access the database where the API server retrieves words. Therefore, I downloaded the words as local text files. If the entered word is not in the database, the input will not be considered valid. I found a database of 5-letter English words on the internet. As for the Turkish word data that is not yet active but is available in the files, I rearranged 5-letter Turkish words from a database containing all Turkish words using Node.js. I haven't added the words to the game yet because the words are not yet optimal enough.

The project is not designed to be responsive. It does not work optimally on phones and other small screens.

To test the winning condition, you can click on the button on the top right that contains my name 10 times. The button content will turn into the answer.

(translated by chatGPT)
