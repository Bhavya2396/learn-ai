/**
 * Story content for Chapter 3 - तुम कब जाओगे, अतिथि
 * Sharad Joshi's satirical essay content and display logic
 */

// Story parts data
const storyParts = {
    1: {
        title: "लेखक परिचय",
        content: `
            <div class="author-intro">
                <h3>शरद जोशी (1931 - 1991)</h3>
                <p>शरद जोशी का जन्म मध्य प्रदेश के उज्जैन शहर में 21 मई 1931 को हुआ। इनका बचपन कई शहरों में बीता। कुछ समय तक ये सरकारी नौकरी में रहे, फिर इन्होंने लेखन को आजीविका के रूप में अपना लिया।</p>
                
                <p>इन्होंने आरंभ में कुछ कहानियाँ लिखीं, फिर पूरी तरह व्यंग्य-लेखन ही करने लगे। इन्होंने व्यंग्य लेख, व्यंग्य उपन्यास, व्यंग्य कॉलम के अतिरिक्त हास्य-व्यंग्यपूर्ण धारावाहिकों की पटकथाएँ और संवाद भी लिखे। हिंदी व्यंग्य को प्रतिष्ठा दिलाने वाले प्रमुख व्यंग्यकारों में शरद जोशी भी एक हैं।</p>
                
                <h4>प्रमुख कृतियाँ:</h4>
                <ul>
                    <li><strong>व्यंग्य-कृतियाँ:</strong> परिक्रमा, किसी बहाने, जीप पर सवार इल्लियाँ, तिलस्म, रहा किनारे बैठ, दूसरी सतह, प्रतिदिन</li>
                    <li><strong>व्यंग्य नाटक:</strong> अंधों का हाथी और एक था गधा</li>
                    <li><strong>उपन्यास:</strong> मैं, मैं केवल मैं, उर्फ़ कमलापति</li>
                </ul>
                
                <p>शरद जोशी की भाषा अत्यंत सरल और सहज है। मुहावरों और हास्य-परिहास का हल्का स्पर्श देकर इन्होंने अपनी रचनाओं को अधिक रोचक बनाया है। धर्म, अध्यात्म, राजनीति, सामाजिक जीवन, व्यक्तिगत आचरण कुछ भी शरद जोशी की तेज़ नज़र से बच नहीं सका है।</p>
                
                <p>इन्होंने अपनी व्यंग्य-रचनाओं में समाज में पाई जाने वाली सभी विसंगतियों का बेबाक चित्रण किया है। पाठक इस चित्रण को पढ़कर चकित भी होता है और बहुत कुछ सोचने को विवश भी।</p>
                
                <p>प्रस्तुत पाठ 'तुम कब जाओगे, अतिथि' में शरद जोशी ने ऐसे व्यक्तियों की खबर ली है, जो अपने किसी परिचित या रिश्तेदार के घर बिना कोई पूर्व सूचना दिए चले आते हैं और फिर जाने का नाम ही नहीं लेते, चाहे उनके लिए मेजबान परेशान हो या खुश। अतिथि अवधि बीत अतिथि कब हो जाता है? वह, जो पहले से अपने आने की सूचना देकर आए और एक-दो दिन मेज़बानी कराके विदा हो जाए या वह, जिसके आगमन के बाद मेज़बान यह सब सोचने को विवश हो जाए, जो इस पाठ के मेज़बान निरंतर सोचते हैं।</p>
            </div>
        `
    },
    2: {
        title: "तुम कब जाओगे, अतिथि",
        content: `
            <div class="essay-content">
                <p class="essay-para">आज तुम्हारे आगमन के चतुर्थ दिवस पर यह प्रश्न बार-बार मन में घुमड़ रहा है- <span class="highlight-vocab" data-meaning="कब चले जाओगे">तुम कब जाओगे, अतिथि?</span></p>
                
                <p class="essay-para">तुम जहाँ बैठे <span class="highlight-vocab" data-meaning="बिना संकोच के">निसंकोची</span> सिगरेट का धुँआ फेंक रहे हो, उसके ठीक सामने एक 'कैलेंडर' है। देख रहे हो ना? इसकी तारिखें अपनी सीमा में <span class="highlight-vocab" data-meaning="प्रेम से">स्नेह</span> से फड़फड़ाती रहती हैं। विगत दो दिनों से मैं तुम्हें दिखाकर तारिखें बदल रहा हूँ।</p>
                
                <p class="essay-para">तुम जानते हो, अगर तुम्हें हिसाब लगाना आता है कि यह चौथा दिन है, तुम्हारे <span class="highlight-vocab" data-meaning="निरंतर">सतत</span> <span class="highlight-vocab" data-meaning="मेहमानदारी">आतिथ्य</span> का चौथा भारी दिन! पर तुम्हारे जाने की कोई संभावना प्रतीत नहीं होती।</p>
                
                <p class="essay-para">लाखों मील लंबी यात्रा करने के बाद वे दोनों <span class="highlight-vocab" data-meaning="अंतरिक्ष यात्री">एस्ट्रोनॉट्स</span> भी इतने समय चाँद पर नहीं रुके थे, जितने समय तुम एक छोटी-सी यात्रा कर मेरे घर आए हो। तुम अपने चरण-कमलों की छाप मेरी ज़मीन को अंकित कर चुके।</p>
                
                <p class="essay-para">तुमने एक <span class="highlight-vocab" data-meaning="घनिष्ठ">अंतरंग</span> निजी संबंध मुझसे स्थापित कर लिया। तुम मेरे अधिक आत्मीय हो गए हो। दूसरे दिन से ही तुम, मेरी कल्याणकामना नहीं चाह रहे थे। तुम कब जाओगे, अतिथि? तुम्हारे जाने के लिए यह उत्तम समय अर्थात राइट टाइम है। क्या तुम्हें तुम्हारी ट्रेन नहीं पुकारती?</p>
                
                <p class="essay-para">उस दिन जब तुम आए थे, मेरा हृदय किसी अज्ञात <span class="highlight-vocab" data-meaning="डर, चिंता">आशंका</span> से धड़क उठा था। अंदर-ही-अंदर कहीं मेरा बटुआ काँप गया। उसके बावजूद एक स्नेही मुस्कराहट के साथ मैं तुमसे गले मिला था और मेरी पत्नी ने तुम्हें सादर नमस्ते भी की।</p>
                
                <p class="essay-para">तुम्हारे सम्मान में, हे अतिथि, हमने रात के भोजन को एक उच्च-मध्यम वर्ग के डिनर में बदल दिया था। तुम्हें स्मरण होगा कि दो सब्ज़ियाँ और रायता के अलावा हमने मीठा भी बनवाया था। इस सारे उत्साह और लगन के मूल में एक आशा थी।</p>
                
                <p class="essay-para">आशा थी कि दूसरे दिन किसी रेल से एक शानदार <span class="highlight-vocab" data-meaning="मेहमान की सेवा">मेज़बाननवाज़ी</span> की छाप अपने हृदय में ले कर तुम चले जाओगे। हम तुमसे रुकने के लिए आग्रह करेंगे, मगर तुम नहीं मानोगे और एक अच्छे अतिथि की तरह चले जाओगे। पर ऐसा नहीं हुआ!</p>
                
                <p class="essay-para">दूसरे दिन भी तुम अपनी अतिथि-सुलभ मुस्कान लिए घर में ही बने रहे। हमने अपनी पीड़ा पी ली और प्रसन्न बने रहे। स्वागत-सत्कार के जिस उच्च बिंदु पर हम तुम्हें ले जा चुके थे, वहाँ से नीचे उतर हमने फिर दोपहर के भोजन को लंच की गरिमा प्रदान की और रात्रि को तुम्हें सिनेमा दिखाया।</p>
                
                <p class="essay-para">हमारे सत्कार का यह आखिरी <span class="highlight-vocab" data-meaning="सीमा">छोर</span> है, जिससे आगे हम किसी के लिए नहीं बढ़ेंगे। इसके तुरंत बाद <span class="highlight-vocab" data-meaning="प्रेम से भरी">भावभीनी</span> विदाई का वह भीगा हुआ क्षण आ जाना चाहिए था, जब तुम विदा होते और हम तुम्हें स्टेशन तक छोड़ने जाते। पर तुमने ऐसा नहीं किया।</p>
                
                <p class="essay-para">तीसरे दिन की सुबह तुमने मुझसे कहा, "मैं धोबी को कपड़े देना चाहता हूँ।" यह <span class="highlight-vocab" data-meaning="चोट">आघात</span> <span class="highlight-vocab" data-meaning="अनपेक्षित">अप्रत्याशित</span> था और इसकी चोट <span class="highlight-vocab" data-meaning="दिल को छू जाने वाली">मार्मिक</span> थी। तुम्हारे <span class="highlight-vocab" data-meaning="निकटता">सामीप्य</span> की वेला एकाएक यूँ रबर की तरह खिंच जाएगी, इसका मुझे अनुमान न था।</p>
                
                <p class="essay-para">पहली बार मुझे लगा कि अतिथि सदैव देवता नहीं होता, वह मानव और थोड़े अंशों में राक्षस भी हो सकता है।</p>
                
                <p class="essay-para">"किसी लॉण्ड्री पर दे देते हैं, जल्दी धुल जाएँगे।" मैंने कहा। मन-ही-मन एक विश्वास पल रहा था कि तुम्हें जल्दी जाना है।</p>
                
                <p class="essay-para">"कहाँ है लॉण्ड्री?" पत्नी ने पूछा।</p>
                
                <p class="essay-para">"चलो चलते हैं!" मैंने कहा और अपनी सहज बनियान पर <span class="highlight-vocab" data-meaning="रस्मी">औपचारिक</span> कुरता डालने लगा।</p>
                
                <p class="essay-para">"कहाँ जा रहे हैं?" पत्नी ने पूछा।</p>
                
                <p class="essay-para">"इनके कपड़े लॉण्ड्री पर देने हैं!" मैंने कहा।</p>
                
                <p class="essay-para">मेरी पत्नी की आँखें एकाएक बड़ी-बड़ी हो गई। आज से कुछ बरस पूर्व उनकी आँखें देख मैंने अकेलेपन की यात्रा समाप्त कर बिस्तर खोल दिया था। पर अब जब वे ही आँखें बड़ी होती हैं तो मन छोटा होने लगता है। वे इस आशंका और भय से बड़ी हुई थीं कि अतिथि अधिक दिनों ठहरेगा।</p>
                
                <p class="essay-para">और आशंका <span class="highlight-vocab" data-meaning="जड़रहित, बिना आधार का">निर्मूल</span> नहीं थी। अतिथि! तुम जा नहीं रहे हो। लॉण्ड्री पर दिए कपड़े धुलकर आ गए और तुम यहीं हो। तुम्हारे भारी-भरकम शरीर से सलवटें पड़ी चादर बदरंग हो चुकी है!</p>
                
                <p class="essay-para">तुम्हें देखकर फटी-फटी <span class="highlight-vocab" data-meaning="तिर्छी नज़र से">कनखियों</span> वाला मुसकराना धीरे-धीरे फीका पड़कर अब लुप्त हो गया है। तुलसी की कुटिया को मैंने जो तुम्हारे लिए <span class="highlight-vocab" data-meaning="सहज">सहज</span> बनाया था, उसे रेलगाड़ी नहीं पहचानती।</p>
                
                <p class="essay-para">अतिथि को समर्पित हुई रेशमी सेज चुपचाप पड़ी है। अब से तुम किसी को नहीं मिला रहे हो। मैं कल से मैं उपन्यास पढ़ रहा हूँ और तुम फिल्मी पत्रिका के पन्ने पलट रहे हो।</p>
                
                <p class="essay-para">शब्दों का लेन-देन मिट गया और चर्चा के विषय चुक गए। परिवार, बच्चे, नौकरी, भविष्य, राजनीति, रिश्तेदार, तुलनाएँ, पुराने दोस्त, पहचान-न्योछावर, पत्नियों, साहित्य और यहाँ तक कि आँख मार कर दूसरे सामने बुराइयों-निंदाओं का भी जिक्र कर लिया और अब एक चुप्पी है।</p>
                
                <p class="essay-para">सौहार्द अब ठंडे और भरे नाश्ते में <span class="highlight-vocab" data-meaning="बदल जाना">रूपांतरित</span> हो रहा है। भावनाएँ गालियों का स्वरूप ग्रहण कर रही हैं, पर तुम जा नहीं रहे। किसी अदृश्य गोंद से तुम्हारा व्यक्तित्व यहाँ चिपक गया है, मैं इस भेद को सपरिवार नहीं समझ पा रहा हूँ!</p>
                
                <p class="essay-para">सत्कार की <span class="highlight-vocab" data-meaning="गर्मी">ऊष्मा</span> अब खत्म हो रही है।</p>
                
                <p class="essay-para">तुम कौन अतिथि हो?</p>
                
                <p class="essay-para">कल पत्नी ने धीरे से पूछा था, "कब तक टिकेंगे ये?"</p>
                
                <p class="essay-para">कैसे कह सकता हूँ, कब तक!</p>
                
                <p class="essay-para">"बस, मेरे दिल की हिचकियाँ मेरे मुँह से निकल रही हैं।"</p>
                
                <p class="essay-para">कल मैंने पत्नी से कहा, "अतिथि-ग्रह की अतिथि-व्यवस्था में यह व्यवस्था है कि अतिथि, अतिथि ही रहे, देवता की तरह पधारकर विदा ले ले!"</p>
                
                <p class="essay-para">पत्नी ने चुपचाप सिर हिला दिया।</p>
                
                <p class="essay-para">मेहमानदारी से मेरा मन ऊब गया है।</p>
                
                <p class="essay-para">चार दिन हो गए!</p>
                
                <p class="essay-para">अतिथि की ओर मैं आँख उठा कर नहीं देखता।</p>
                
                <p class="essay-para">पर वह मुझे घूरती आँखों से देखा करता है।</p>
                
                <p class="essay-para">"अब मुझे विदा का समय आ गया है।"</p>
                
                <p class="essay-para">"यह खुशखबरी तुमने मुझे दी है या मैंने तुम्हें? यह भेद खुल नहीं पाता है।"</p>
                
                <p class="essay-para">"अच्छा चलते हैं!"</p>
                
                <p class="essay-para">"हाँ, चलो! स्टेशन तक मैं तुम्हें छोड़ आता हूँ!"</p>
                
                <p class="essay-para">हम दोनों चुपचाप चल दिए।</p>
                
                <p class="essay-para">विदा के समय उसने मेरी पीठ ठोंक कर कहा, "फिर आऊँगा!"</p>
                
                <p class="essay-para">मैं मुस्करा भर दिया।</p>
                
                <p class="essay-para">पत्नी ने स्टेशन पर ही पूछ लिया, "कब आएँगे ये?"</p>
                
                <p class="essay-para">मैंने कहा, "जब तक आकाश में चाँद-तारे रहेंगे!"</p>
                
                <p class="essay-para">अपनी वैवाहिक तपस्या को गौकाबार रूप प्रदान करते तो हमें उपवास तक जाना होगा। तुम्हारे-मेरे संबंध एक <span class="highlight-vocab" data-meaning="एक स्थिति से दूसरी में बदलाव">संक्रमण</span> के दौर से गुज़र रहे हैं। तुम्हारे जाने का यह चरम क्षण है। तुम जाओ न अतिथि।</p>
                
                <p class="essay-para">"नहीं, मैं तो चला जाऊँगा और हाँ, मैं जाता हूँ! दूसरों के यहाँ अच्छा लगता है। अपना बस चलता तो सभी लोग दूसरों के यहाँ रहते, पर ऐसा नहीं हो सकता। अपने घर की मोह के प्रति इसी कारण मारा गई है।"</p>
                
                <p class="essay-para">"होम को किसी कारण से स्वीट-होम कहा गया है कि लोग दूसरे के होम की स्वीटनेस को काटने न दौड़ें। तुम्हें यहाँ अच्छा लग रहा है, पर सोचो कि ज़रूरत भी कोई चीज़ होती है और गेट आउट भी एक वाक्य है, जो बोला जा सकता है।"</p>
                
                <p class="essay-para">अपने ज़रूरी काम और दायित्वों को निपटाने के बाद कल जो किरण तुम्हारे बिस्तर पर आएगी, वह तुम्हें यहाँ मेज़बान के पास भेजी परिचित किरण होगी। आशा है, वह तुम्हें चुमेगी और तुम पर लौटने का सुंदरपूर्ण निर्णय ले लेगी।</p>
                
                <p class="essay-para">मेरी <span class="highlight-vocab" data-meaning="सहन करने की शक्ति">सहनशीलता</span> की वह अंतिम सुबह होगी। उसके बाद मैं स्थिर नहीं कर सकूँगा और लड़खड़ाता जाऊँगा। मेरे अतिथि, मैं जानता हूँ कि तुम्हें <span class="highlight-vocab" data-meaning="गूंजता हुआ">गुंजायमान</span> करने वाला अतिथि देवता होता है, वह अधिक से अधिक दो दिन रुकता है।</p>
                
                <p class="essay-para">मैं भी तुम्हें देवता नहीं कह रहा हूँ! एक देवता और एक मनुष्य अधिक देर साथ नहीं रहते। देवता दरवाज़ा देखकर लौट जाता है। तुम लौट जाओ अतिथि! इसी में तुम्हारा देवत्व सुरक्षित रहेगा। यह मनुष्य अपनी असलियत पर उतरे, उसके पूर्व तुम लौट जाओ!</p>
                
                <p class="essay-para">उफ़, तुम कब जाओगे, अतिथि?</p>
            </div>
        `
    },
    3: {
        title: "शब्दार्थ",
        content: `
            <div class="vocabulary-section">
                <h3>मुख्य शब्दार्थ</h3>
                
                <div class="vocabulary-grid">
                    <div class="vocab-item">
                        <strong>निसंकोच</strong> - संकोचरहित, बिना संकोच के
                    </div>
                    <div class="vocab-item">
                        <strong>स्नेह</strong> - प्रेम, मोहब्बत
                    </div>
                    <div class="vocab-item">
                        <strong>सतत</strong> - निरंतर, लगातार
                    </div>
                    <div class="vocab-item">
                        <strong>आतिथ्य</strong> - मेहमानदारी
                    </div>
                    <div class="vocab-item">
                        <strong>ऐस्ट्रॉनॉट्स</strong> - अंतरिक्ष यात्री
                    </div>
                    <div class="vocab-item">
                        <strong>अंतरंग</strong> - घनिष्ठ, गहरा
                    </div>
                    <div class="vocab-item">
                        <strong>आशंका</strong> - डर, भय
                    </div>
                    <div class="vocab-item">
                        <strong>मेज़बाननवाज़ी</strong> - अतिथि सत्कार
                    </div>
                    <div class="vocab-item">
                        <strong>छोर</strong> - किनारा, सीमा
                    </div>
                    <div class="vocab-item">
                        <strong>भावभीनी</strong> - प्रेम से ओतप्रोत
                    </div>
                    <div class="vocab-item">
                        <strong>आघात</strong> - चोट, सदमा
                    </div>
                    <div class="vocab-item">
                        <strong>अप्रत्याशित</strong> - आकस्मिक, अनसोचा
                    </div>
                    <div class="vocab-item">
                        <strong>मार्मिक</strong> - मर्मस्पर्शी
                    </div>
                    <div class="vocab-item">
                        <strong>सामीप्य</strong> - निकटता, समीपता
                    </div>
                    <div class="vocab-item">
                        <strong>औपचारिक</strong> - रिवाजी, रस्मी
                    </div>
                    <div class="vocab-item">
                        <strong>निर्मूल</strong> - मूलरहित, बिना जड़ का
                    </div>
                    <div class="vocab-item">
                        <strong>कनखियों</strong> - तिर्छी नज़र से
                    </div>
                    <div class="vocab-item">
                        <strong>सहज</strong> - प्राकृतिक, सरल
                    </div>
                    <div class="vocab-item">
                        <strong>रूपांतरित</strong> - जिसका रूप बदल दिया हो
                    </div>
                    <div class="vocab-item">
                        <strong>ऊष्मा</strong> - गर्मी, उष्णता
                    </div>
                    <div class="vocab-item">
                        <strong>संक्रमण</strong> - एक स्थिति से दूसरी में प्रवेश
                    </div>
                    <div class="vocab-item">
                        <strong>सहनशीलता</strong> - सहन करने की शक्ति
                    </div>
                    <div class="vocab-item">
                        <strong>गुंजायमान</strong> - गूंजता हुआ
                    </div>
                </div>
                
                <div class="essay-context">
                    <h4>व्यंग्य लेख का संदेश</h4>
                    <p>प्रस्तुत पाठ 'तुम कब जाओगे, अतिथि' में शरद जोशी ने ऐसे व्यक्तियों की खबर ली है, जो अपने किसी परिचित या रिश्तेदार के घर बिना कोई पूर्व सूचना दिए चले आते हैं और फिर जाने का नाम ही नहीं लेते, चाहे उनके लिए मेजबान परेशान हो या खुश।</p>
                    
                    <p>अतिथि की अवधि बीत जाने पर अतिथि कब समस्या हो जाता है? वह, जो पहले से अपने आने की सूचना देकर आए और एक-दो दिन मेज़बानी कराके विदा हो जाए या वह, जिसके आगमन के बाद मेज़बान यह सब सोचने को विवश हो जाए, जो इस पाठ के मेज़बान सोचते हैं।</p>
                </div>
            </div>
        `
    }
};

// Current story part tracker
let currentStoryPart = 1;

// Function to show specific story part
window.showStoryPart = function(partNumber, autoStart = false) {
    console.log(`Showing story part: ${partNumber}, autoStart: ${autoStart}`);
    
    // Stop any ongoing narration first
    if (window.narrator) {
        window.narrator.stop();
        console.log('Stopped ongoing narration');
    }
    
    // Hide any reading indicators
    hideReadingIndicator();
    
    // Remove active class from all navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Add active class to clicked button
    const navButtons = document.querySelectorAll('.story-nav-btn');
    if (navButtons[partNumber - 1]) {
        navButtons[partNumber - 1].classList.add('active');
        navButtons[partNumber - 1].setAttribute('aria-pressed', 'true');
    }
    
    // Update content
    const storyContent = document.getElementById('storyContent');
    if (storyContent && storyParts[partNumber]) {
        storyContent.innerHTML = `
            <div class="story-part active">
                <div class="story-part-title">${storyParts[partNumber].title}</div>
                ${storyParts[partNumber].content}
            </div>
        `;
        
        // Add tooltips to highlighted vocabulary
        addVocabularyTooltips();
        
        currentStoryPart = partNumber;
        
        // Scroll to top of content
        storyContent.scrollTop = 0;
        
        // Only start narration if explicitly requested (when user clicks button)
        if (autoStart && window.narrator && window.narrator.enabled) {
            setTimeout(() => {
                window.readCurrentStoryPartAloud();
            }, 500); // Small delay to ensure content is loaded
        }
    }
}

// Function to add vocabulary tooltips
function addVocabularyTooltips() {
    document.querySelectorAll('.highlight-vocab').forEach(vocab => {
        const meaning = vocab.getAttribute('data-meaning');
        if (meaning) {
            // Create tooltip element
            const tooltip = document.createElement('span');
            tooltip.className = 'vocab-tooltip';
            tooltip.textContent = meaning;
            vocab.appendChild(tooltip);
        }
    });
}

// Function to read current story part aloud
window.readCurrentStoryPartAloud = function() {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content not found');
        return;
    }
    
    // Stop any ongoing narration
    window.narrator.stop();
    
    // Show reading indicator
    showReadingIndicator();
    
    let textToRead = '';
    
    // Get text based on current part
    switch(currentStoryPart) {
        case 1:
            // For author introduction, read the main content
            const authorIntro = storyContent.querySelector('.author-intro');
            if (authorIntro) {
                const paragraphs = authorIntro.querySelectorAll('p');
                textToRead = storyParts[1].title + '। ';
                paragraphs.forEach(p => {
                    textToRead += p.textContent + ' ';
                });
            }
            break;
            
        case 2:
            // For the essay, read paragraph by paragraph with highlighting
            textToRead = storyParts[2].title + '। ';
            readEssayWithHighlighting();
            return; // Early return as we handle highlighting separately
            
        case 3:
            // For vocabulary, read the main words and meanings
            textToRead = storyParts[3].title + '। यहाँ व्यंग्य लेख में प्रयुक्त मुख्य शब्दों के अर्थ दिए गए हैं।';
            break;
    }
    
    if (textToRead) {
        // Set callback to hide reading indicator when done
        window.narrator.onEndCallback = function() {
            hideReadingIndicator();
        };
        
        // Speak the content
        speakInSequence(textToRead);
    }
}

// Function to read essay with paragraph highlighting
function readEssayWithHighlighting() {
    const essayParas = document.querySelectorAll('.essay-para');
    if (essayParas.length === 0) {
        console.error('Essay paragraphs not found');
        return;
    }
    
    showReadingIndicator();
    
    let currentParaIndex = 0;
    
    function readNextParagraph() {
        if (currentParaIndex >= essayParas.length) {
            // All paragraphs read, hide indicator
            hideReadingIndicator();
            clearAllHighlights();
            return;
        }
        
        const currentPara = essayParas[currentParaIndex];
        
        // Clear previous highlights
        clearAllHighlights();
        
        // Highlight current paragraph
        currentPara.classList.add('paragraph-highlight');
        
        // Scroll to current paragraph if needed
        currentPara.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Get text content (remove highlighted vocab markup for cleaner reading)
        let paraText = currentPara.textContent || currentPara.innerText;
        
        // Set callback for when this paragraph finishes
        window.narrator.onEndCallback = function() {
            currentParaIndex++;
            // Small delay before next paragraph
            setTimeout(readNextParagraph, 500);
        };
        
        // Speak current paragraph
        window.narrator.speak(paraText);
    }
    
    // Start reading from first paragraph
    readNextParagraph();
}

// Function to clear all paragraph highlights
function clearAllHighlights() {
    document.querySelectorAll('.paragraph-highlight').forEach(para => {
        para.classList.remove('paragraph-highlight');
    });
}

// Function to show reading indicator
function showReadingIndicator() {
    // Remove existing indicator
    const existingIndicator = document.querySelector('.reading-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    const indicator = document.createElement('div');
    indicator.className = 'reading-indicator';
    indicator.innerHTML = `
        <div class="reading-spinner"></div>
        <span>पढ़ा जा रहा है...</span>
    `;
    
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(indicator);
    }
}

// Function to hide reading indicator
function hideReadingIndicator() {
    const indicator = document.querySelector('.reading-indicator');
    if (indicator) {
        indicator.classList.add('fade-out');
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 500);
    }
}

// Initialize story content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all scripts are loaded
    setTimeout(() => {
        // Show first part by default
        if (typeof window.showStoryPart === 'function') {
            window.showStoryPart(1);
        }
        
        // Add event listeners to story navigation buttons as backup to onclick
        document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Navigation button ${index + 1} clicked`);
                if (typeof window.showStoryPart === 'function') {
                    // Start narration automatically when user clicks navigation button
                    window.showStoryPart(index + 1, true);
                }
            });
        });
    }, 100);
});

// Function to speak text in sequence (utility function)
function speakInSequence(text) {
    if (!window.narrator) return;
    
    // Break the text into sentences
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
    
    function speakNextSentence(index = 0) {
        if (index >= sentences.length) {
            if (window.narrator.onEndCallback) {
                window.narrator.onEndCallback();
            }
            return;
        }
        
        // Set callback for when this sentence ends
        window.narrator.onEndCallback = function() {
            // Small pause between sentences
            setTimeout(() => {
                speakNextSentence(index + 1);
            }, 200);
        };
        
        // Speak the current sentence
        window.narrator.speak(sentences[index]);
    }
    
    // Start speaking the first sentence
    speakNextSentence(0);
}

// CSS for vocabulary grid
const vocabStyles = `
<style>
.vocabulary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.vocab-item {
    padding: 12px 16px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
    transition: all 0.3s ease;
}

.vocab-item:hover {
    background: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.vocab-item strong {
    color: var(--primary-color);
    font-weight: 600;
}

.essay-context {
    margin-top: 30px;
    padding: 20px;
    background: #f0f8ff;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.essay-context h4 {
    color: #1565c0;
    margin-bottom: 15px;
}

.essay-para {
    margin-bottom: 15px;
    padding: 8px 0;
    line-height: 1.8;
    transition: all 0.3s ease;
}

.paragraph-highlight {
    background-color: rgba(255, 236, 179, 0.4);
    border-left: 3px solid #ffc107;
    padding-left: 10px;
    border-radius: 4px;
}

@media (max-width: 768px) {
    .vocabulary-grid {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', vocabStyles);
