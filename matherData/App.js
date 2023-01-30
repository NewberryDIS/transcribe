import logo from './logo.svg';
import './App.css';

function App() {
  let mather = require('./data/mather.json');
  const data = mather.map(m => {
    let pages = m.pages.map((p, index) => {return {
      "book": `<td><a href="https://publications.newberry.org/transcribe/#/item/${m.id}">${m.id}</a></td>`,
      "page": `<td>${index+1}</td>`,
      "pageurl": `<td><a href="https://publications.newberry.org/transcribe/#/item/${m.id}/page/${p.pageid}"><img src="https://digital.newberry.org/transcribe/omeka/files/original/${p.pagefilename}" /></a></td>`,
      "transcription": `<td className="transcription">${p.transcription}.split('\n').map(str => <p>{str}</p>)}</td>`
    }})
    return pages
  })
  let toCsv = data.map(row => row.join(',')).join('\n')
  const dataTable = <table>
    <thead>
      <td>book</td>
      <td>page number</td>
      <td>page image</td>
      <td>transcription</td>
    </thead><tr>
      <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>1</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57868"><img src="https://digital.newberry.org/transcribe/omeka/files/original/c05818b8f6dd8fbb0f3029c1283499c6.jpg" /></a></td>
    <td className="transcription">{`102`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>2</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57869"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7ff8d64f37205a6ae0046abd36e3fe0e.jpg" /></a></td>
    <td className="transcription">{`Wednesday August 17- This\nmorning we left our encampment\non the east Bank of the Little Arkansas\nwho after crossing that stream\n(which runs freely over a sandy\nbottom + is on the whole a fine\ncreek tho but little timber on its\nbanks) proceeded on our course\ntowards the main Arkansas- The\nprairie is low and wet between\n? Little Arkansas and the sand hills which\nare distant about four miles \non our route - We entered the`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>3</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57870"><img src="https://digital.newberry.org/transcribe/omeka/files/original/699729cafa85476edbcedb1a8d62ed35.jpg" /></a></td>
    <td className="transcription">{`? which are of extremely\n? gular appearance- The\n? in many places is drifted\nto a considerable height and\nin many places are large ponds\nof water standing on the sand\nThere is no vegetation except an\noccasional spot of plumb Bushes\nThese afford a Red Plumb of fine\nflavour- the hills were two or three\nmiles in width when we crossed them\non leaving them we struck another\nlow, wet prairie + came in sight\nof the main Arkansas - In a few miles\nwe came to a creek in the prairie\ncalled ? + encamped - It`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>4</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57871"><img src="https://digital.newberry.org/transcribe/omeka/files/original/d082eabe365378945bb8d0c7978c2f44.jpg" /></a></td>
    <td className="transcription">{`rained violently during that\nnight + although ?\nby our marque we were somewhat\nuncomfortable distance 9 1/4 miles\nThursday 18 We started early\nthis morning and soon reached\nthe main Arkansas - The scene\nhere presented was entirely novel-\na large river of four hundred\nyards in width running through\nan immense prairie without ever\na solitary tree upon its Banks\nso far as the eye could reach-\nThe river appeared somewhat swollen\n? the current was rapid and\nthe water muddy, resembling\nthe Missouri- There are innumerably`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>5</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57872"><img src="https://digital.newberry.org/transcribe/omeka/files/original/39a5c89931df078553b4794cc5b0187e.jpg" /></a></td>
    <td className="transcription">{`? bars in every direction + ?\nfrom the general appearance it\nmay be forded at its present stage\nallmost any where- some of our hunters\nwho were in advance of us had crossed\nand were pursuing Buffalo on the\nopposite bank- we were compelled\nto proceed a mile or two up the river\nto find sufficient drift wood to cook\nour breakfast - this being done we\nproceeded on our course near the\nbank of the river some distance + en-\ncamped - rattlesnakes are very\nabundant - The banks of the river\nare allmost a perfect plain on this\nside + not more than four feet higher\non the opposite side the sand`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>6</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57873"><img src="https://digital.newberry.org/transcribe/omeka/files/original/de7cc555efd0f1143f733658768571d7.jpg" /></a></td>
    <td className="transcription">{`hills make in to the brink of\nthe river- distance to day\n10 miles genl course\n\nFriday 19 After breakfast we\n\nset out, pursuing our course up the\nriver- with several others I went\nin advance of the waggons - Saw\nseveral large white wolves- who ?\nin a few miles we came up with\nseveral herds of Buffalo- Col. R. ?\n+ MB gave chase + killed one- After\nwaiting some time for the waggons to come\nup, we returned three or four miles\n+ found the main party had\nencamped- one of the mules having\nbeen badly bit by a rattle-snake`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>7</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57874"><img src="https://digital.newberry.org/transcribe/omeka/files/original/67b5f34f29e392cd5f8354fc6b32a153.jpg" /></a></td>
    <td className="transcription">{`-several of the men had gone\nin pursuit of a drove of Buffalo\ncows + calves (the first we had fallen in\nwith) that had crossed from the\nopposite side of insert the /insert river in view of\nthe party- They soon returned with\na large quantity of meat + much\ngratified with their chase- distance\nto day 7 1/2 miles genl course\nSaturday 20- Remained in camp\nfor the purpose of drying our meats\n-Our horses also require rest\nMr Brown ascertained the Lattitude of this\nplace to be 38.11 ? Longitude 98.00.00`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>8</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57875"><img src="https://digital.newberry.org/transcribe/omeka/files/original/3d98d44547adb5ca74aea234f6bcb8ac.jpg" /></a></td>
    <td className="transcription">{`struck our tents after breakfast\nand took a course up the\nriver in the direction of a\nsmall grove of timber- The\nhigh weeds in the bottom prairie\ncontinue troublesome, but there\nare some indicators that we\nhave nearly passed them- The \nsoil over which we now pass is\nrich, of the first rate quality-\nOn our right + about a mile from\nthe river the prairie is considerably\nrotting - Its appearance justifies\nthe conclusion that he country\nto the north is more favourable\nfor a permanent route- from the\nhigh ground, shirts of timber`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>9</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57876"><img src="https://digital.newberry.org/transcribe/omeka/files/original/9d1a199fd4a92ec5dcb761cbe71f97c7.jpg" /></a></td>
    <td className="transcription">{`in that direction appears and the ?? which we left the other day from its general course would have led us two or three nites north & through a ?? country -- The grove we discovered at starting this morning turns out to be an island in the river over which is a few bottom wood ??. We have handled 6 1/2 miles & encampment and bank of the river, where lately a large encampment of Indians -- General course\nMonday 22 The ?? at his ?? ?? ?? we wait to day for the ?? ?? of our horses`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>10</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57877"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ca11023227991802c6dd5d59fc7a6d2b.jpg" /></a></td>
    <td className="transcription">{`Tuesday 23.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>11</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57878"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7219254ff3b00a6d0c8ae08449290207.jpg" /></a></td>
    <td className="transcription">{`was much alarmed. he is no hunter. Passed a village of Prairie dogs - they resemble puppies of two or three weeks old - their houses are under ground, and the arrangement of them & of their villages is curious, the latter are some times three or four miles square - their homes within eight or ten feet of each other. The high grass, weeks & other ? seem to be entirely removed & regularity & neatness prevail. Passing through this town many of them are seen sitting on the little eminence of sand which surround their houses; on the approach of any one, or`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>12</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57879"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7aea84c08c4d34c840ad094934755efd.jpg" /></a></td>
    <td className="transcription">{`of apparent danger they commence yelping + barking, and immediately retreat into their houses. There is a singular union existing between these dogs, rattle snakes, screech owls + night hawks - all of which live together in the same house with apparent concord. It is said that [unclear] any appearance of [ unclear. ] [unclear] of storm or rain, they commence repairing their houses by building into the embankment about the door or [unclear] - This is considered a sure omen of the approach of a storm - found occasionally as we [unclear] [unclear] over the plains of short [unclear] small [unclear] of water - The`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>13</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57880"><img src="https://digital.newberry.org/transcribe/omeka/files/original/09a0a615f72f3fecc1cefa55c5c31650.jpg" /></a></td>
    <td className="transcription">{`still? north of us is doubtful the dividing ridge between the Arkansas & Kansas - A few miles ahead it approaches very near the former & is doubtful the most northern bend of that river. I saw some indications of timber at a distance, supposed to be the waters of the Kansas. The distance between the two rivers cannot be great. After travelling 12 or 15 miles we bore? away for the river & found that the waggons had halted just below a large grove called the pit grove? having made nine miles -`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>14</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57881"><img src="https://digital.newberry.org/transcribe/omeka/files/original/46bb506107e9aed450be8e438a1a6161.jpg" /></a></td>
    <td className="transcription">{`Wednesday 28 _ There was a sudden rise in the river last night & no dew _ The [[unclear] were too unclear _ We struck [[unclear] after breakfast and passed? the large grove of Cottonwood, which is on the opposite side of the river _ The bluff continues about three miles from the river _ We now are passing? the northmost bend of the Arkansas _ Large herds of Buffalo are grazing on the side of the unclear on our right _ After travelling [[unclear] miles through a rich bottom we came to a large creek called walnut Creek, which comes in between the bluff & river from the northwest _ We crossed`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>15</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57882"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ff960600d25e94ffb478c8dad9f01337.jpg" /></a></td>
    <td className="transcription">{`and encamped on the peninsula between the creek & river & on the bank of former. The water is much better than the river, being clear, with a gravel bottom, the river is exceedingly muddy and does not settle like that of the Missouri. There is a fine grove of Walnut & Blue ash on the banks of this creek, which are high & clear? of unclear, bushes unclear we have not found a better camping ground on our route. Our hunters have come in with a supply of meat and report that the Kansas River cannot be more than 10 miles from us. This being a point strongly marked we shall want`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>16</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57883"><img src="https://digital.newberry.org/transcribe/omeka/files/original/95021374668e15c26562a654eae6aa2b.jpg" /></a></td>
    <td className="transcription">{`for Mr Brown to take such unclear as may be thought necessary. Thursday 25 Should the government determine to establish a military post, with reference to the protection of the trade to New Mexico this point must unclear be unclear - It is the only place? where unclear can be procured, + even here it is by no means abundant - In other respects it may be considered more eligible than any point we have unclear - The water of the creek is in quality pure - in quantity abundant and the surrounding country high with every indication of unclear`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>17</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57884"><img src="https://digital.newberry.org/transcribe/omeka/files/original/35de53dcdc04d2823f4a0e114d774460.jpg" /></a></td>
    <td className="transcription">{`so far as local causes? are concerned. The expence of subsisting a garrison here would be great - Supplies would mainly have to be transported by land from Fort Osage by the Little...? or the Big +? Little blues - From the best estimate I am able to make the expense of transportation would be from unclear to $2 per? unclear - There is a prospect of rain + we have determined to make no excursions from camp? to day - some of the unclear have found large quantities of plumbs of fine flavor? on the small sand hills a mile or two on the west of us? -`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>18</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57885"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0c43ff9088f1065d659781e7edf4a664.jpg" /></a></td>
    <td className="transcription">{`Friday 26 - remained at our unclear unclear - deciding after our arrival at this place one of the young men who went in chase of some Buffalo that we unclear from this over? unclear lost his home - He got unclear for unclear purchase of shooting at the unclear the animal unclear and joined a large unlcear of the Buffalo and was seen no more - Today our hunting brought in some very fine meat unclear formed the unclear unclear to be at this place from an observation later this night. 38, 21, 60`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>19</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57886"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7f58a06113af5dccc60d57d25c26cde0.jpg" /></a></td>
    <td className="transcription">{`Saturday 27 This morning M Lobby, unclear this unclear with two or three men set out for the unclear River immediately of unclear this place - Got Reeves with some of the men have gone to explore the source of this creek - I unclear will the rest of the men in unclear. I am reading Confucius? poems - Two young came to the camp who are of a party going unclear unclear - There number is four and are direct from Gantonment? Gibson, which place they think is three hundred fifty miles below the. - The month of the little Arkansas unclear unclear is 100 miles`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>20</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57887"><img src="https://digital.newberry.org/transcribe/omeka/files/original/e1d7ff0cdaeab8283accdba3be96ef4e.jpg" /></a></td>
    <td className="transcription">{`One the young men ? has been at Santa Fe was of the ? party. he thinks the`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>21</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57888"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a39be90a87eb495dc0a0874100923cdf.jpg" /></a></td>
    <td className="transcription">{`traped? on with the intention of reaching us to day - Col Revies? + his party returned after traveling several miles + find that the creek? is much longer than was supposed +? its course appears nearly parralell with the river for a considerable distance - Mr Sibley + his party returned just at sundown after traveling in the course of the day about 25 miles - They found the distance from this place to the Southern most bend of the Smoky fork of the Kansas 10 1/2 miles + from an observation of the sun the latitude at that point 38.30.29`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>22</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57889"><img src="https://digital.newberry.org/transcribe/omeka/files/original/85f5872f1f0a110c0a84b9893c5f34f1.jpg" /></a></td>
    <td className="transcription">{`The [?] at this point is a very inconstructable streat & wastes [?] i fin a [?] a shout [?] below [?] the town into of this marsh there is a large lake from which the river is a gain formed [?] our in quartriesare are here found.\nSunday 28 The sun shines pleasantly & the [?] is [?] this morning after the most violent storm I remember to have witnessed [?] [?] at a good book [?] [?]`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>23</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57890"><img src="https://digital.newberry.org/transcribe/omeka/files/original/defc2d53df44bfc361eb2b7a20f17272.jpg" /></a></td>
    <td className="transcription">{`and continued ‘till morning. The thunder sound and the lightning flashed incessantly for several hours then unclear one continued unclear unclear unclear in a high degree. The rain leak through our marquee and our blankets were not all together sufficient to protect us from the wet. The night was passed most uncomfortably. After drying our blankets, bearskin tents unclear stuck? our tents and proceeded on our course. In about 4 miles we passed the four young men spoken us? yesterday.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>24</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57891"><img src="https://digital.newberry.org/transcribe/omeka/files/original/93d354038f25b5115deb7ac677b71694.jpg" /></a></td>
    <td className="transcription">{`we encamped on the bank of the river which was much swollen + presents in the evening a beautiful appearance - we set for some time admiring the scene presented by the bright rays of the moon reflected in the water perhaps - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - distance today 7 miles unclear Monday 29? I left the waggons just as they were sitting out this morning, and leaving? out from the river for a mile or five came to short grass. The general`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>25</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57892"><img src="https://digital.newberry.org/transcribe/omeka/files/original/f7ddce7f703c0796616596d060504e09.jpg" /></a></td>
    <td className="transcription">{`appearance of the country does not change. On the west bank of the river the sand hills continue and high ground on this side is from two to three miles. Passed two large villages? of prairie dogs - saw two white and one grey wolf and great numbers of Buffalo - and all in company with the four adventurers unclear and travelled with them several miles ‘till we came to a creek of considerable rise? running through the prairie, which was so much swollen as to render it impassable except with rafts. The young men encamped and I stopped for some time - our company not`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>26</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57893"><img src="https://digital.newberry.org/transcribe/omeka/files/original/dfd1601400c69cd96685b09d155b3bf0.jpg" /></a></td>
    <td className="transcription">{`coming up I returned two or three miles & found unclear encamped? on the same bank near its junction with the river they having travelled ten miles -- oposite our? encampment on the edge of the bluff is a unclear of rocks & presents the appearance of a large mound.\nunclear the first of the kind I have noticed in this range of high land - \nTuesday 30 unclear - out after an early breakfast -- rode to the eminence? opposite last night's camp - The prospect from the top of the rock is very extensive and romantic - The country on every`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>27</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57894"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a8cecd804f68737eab50e1d2d5bd1942.jpg" /></a></td>
    <td className="transcription">{`Side presents the appearance of an inclined plain, and the skirts of timber on Walnut creek to the north and of creek & river to the south beautifies & enriches the.....`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>28</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57895"><img src="https://digital.newberry.org/transcribe/omeka/files/original/be25670467fc16815db72b7ef1dc6d7c.jpg" /></a></td>
    <td className="transcription">{`from the base of the country & the course of the creek which affords much better water than the river, it is highly probable a better route for the road may be formed in that direction. Wednesday 31. We crossed- could be using the german lettering for the double s sound the creek this morning without difficulty and bore in a direction to shrink the river at the mouth at the pawns fork, leaving the high ground to the left- at this place the cliff is bold & rocky & near the river- found this fork too high to cross`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>29</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57896"><img src="https://digital.newberry.org/transcribe/omeka/files/original/24980e79475392a5823e4c3fb0137114.jpg" /></a></td>
    <td className="transcription">{`at this place- proceeded on two or three miles & we camped on the bank of the creek- distance about eight miles. The prospect from the bluffs at this place is fine. Several names carved on the rock, which are all most a sandstone. This creek is generally hard bottom, tho the bank are very high & muddy. it has been much swollen by the late rain & no doubt from the appearance of the shore is unknown to great swell, the seem not infrequently to be inundated`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>30</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57897"><img src="https://digital.newberry.org/transcribe/omeka/files/original/267fa26dd9206efab5d26859ed109b91.jpg" /></a></td>
    <td className="transcription">{`Thursday September 1. After digging the banks of the creek a short distance above our encampment & immediately opposite the point of the bluff, we crossed with our waggon & pursuing a direction south unknown again unknown the river near the mouth of a small clear creek with gravel bottom- following the bank of the creek some distance we encamped having travelled 10 unknown miles. so far the distance from this creek to the river in no place exceeds 20 roads? The river bottom is higher the`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>31</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57898"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0fbff96be707b020b2872af59631924f.jpg" /></a></td>
    <td className="transcription">{`evil of better quality than hitherto -Friday 2 A stormy day - we remain at our encampment - Saturday 3 Last night we were roused from our slumber about 10 oclock by the running of our horses past the encampment. Expecting that a party of Indians were advancing towards us immediate preparation was made for defense - none however made their appearance and it was concluded that the`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>32</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57899"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0f4cecd02fba657c7dec742396f6d726.jpg" /></a></td>
    <td className="transcription">{`fright of the horses was occasioned by the near approach of Buffalo or wild horses - At 9 oclock we set out again. The waggons encamped up the river which at this bend is nearly a south course - I rode over the Ridge several miles & find that the pawnee fork heads near the main? river & is not distant from it more than 8 or few miles in any place, judgeing from the timber which I saw on that creek which appears quite abundant - upon turning towards the river I found that the waggons were directly opposite me & about to encamp - the bottom line`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>33</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57900"><img src="https://digital.newberry.org/transcribe/omeka/files/original/60bc5c2de3733c30e0b01335853f1682.jpg" /></a></td>
    <td className="transcription">{`is considerably wider than below at the place it is between two or three miles in width - unclear a creek which meanders through the bottom, which must be the same upon which we encamped last night - saw five wild horses during my ride - I had not unclear unclear before this - we got down of the horses came withing 150 yards of us - they were animals of good appearance with fine long flowing tails - as I fired at one of them for purpose of unclear him - they started off at the report of the gun & unclear the breese in apparent defiance of any effort of ours to`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>34</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57901"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7b6a13eb0448dc5e5e7d076ba2e6d22f.jpg" /></a></td>
    <td className="transcription">{`take them - upon joining the waggons found they had travelled about 12 miles & encamped on the bank of Arkansas - The general apparance, soil to of the country unclear to day is the same as for the last three or four days - On the opposite side of the river at this place the sand hills are nearly covered with verdane - there is a large grove of timber? also & apparently timber is scattering for a considerable distance up the river on that side - Williams who unclear the river & shot an Elk & came to camp just as we stopped reports that there is an abundance of unclear on that`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>35</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57902"><img src="https://digital.newberry.org/transcribe/omeka/files/original/eb92e3bcd175d9d9db01cf2bb77683cd.jpg" /></a></td>
    <td className="transcription">{`side - as we have not found any for some days past; several of the young men are wading the river, unclear anxious are they to procure some - The weather as yet does not appeared settled - today has been pleasant but there is every indication of a storm tonight - unclear [unclear]] unclear dogs are preparing our horses for it - Sunday 4 The wind blows fresh from the Southmost & is quite cool - have had no rain as was expected last night - Started at nine oclock & pursued a course about Sout 30N, up the river in`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>36</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57903"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0cc7cd66f058a406a4cd3e5a67f29889.jpg" /></a></td>
    <td className="transcription">{`the bottom continues high to day and its width increases - for some distance To day the bluff entirely disapeared , so gentle was the rise from the river - We traveled 12 miles & encamped on the bank of the river - here the bluff can scarcely be discerned - there were several islands in the river in sight covered with (graf ?)The land hills continue covered with ( graf ?) & considerable timber -`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>37</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57904"><img src="https://digital.newberry.org/transcribe/omeka/files/original/eb79b27efbcbf2ccee06eefa66f2be17.jpg" /></a></td>
    <td className="transcription">{`Monday 5 Lit out at 9 o clk unclear warm? - proceeded up the river about 10 miles - The country from the unclear rises gradually, the bluff allmost entirely disapearing - The soil is unclear + has been for a day or two past - at this place there is a single cotton wood tree + just above it? are several - the? first timber I have noticed for some time, on this bank of the Arkansas - a strong indication of a storm unclear night - the distant thunder + lightning + roaring of the winds is tremendous, such seeing its distance it is probable it will`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>38</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57905"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7879a3c9a0862c61aaaef7cc04810767.jpg" /></a></td>
    <td className="transcription">{`have spent its force before it reaches here -\nTuesday 6 The storm was violent last night the wind was strong and it was near blowing our tent away the rain has eased and the wind continues & we are here having to travel a few miles to day - After leaving our encampment in about 2 1/2 miles the bluff again appears & appears near river it is bold & waky – pave a large spring flowing out of it - in the river is quite a cluster of islands, near the head of which the bluff river makes entirely to the bluff which is a [perpendicular?]`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>39</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57906"><img src="https://digital.newberry.org/transcribe/omeka/files/original/dad9102a71408afffef17ab3a66a25a0.jpg" /></a></td>
    <td className="transcription">{`cliff of rocks about 20 feet high - under this a warm spring runs - we encamp about half a mile above this point & in the most southernly bend of the river - The land hills for the first time since we struck the Arkansas now entirely disappear & the pace of the country on the opposite side is much like the upland on this [?] finds from a satisfactory observation that the latitude of this place is 37.38,00\nMonday 7 Say by to day in order to give [?] an opportunity to make this entry for observations`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>40</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57907"><img src="https://digital.newberry.org/transcribe/omeka/files/original/94c93d3db3c4af9bff7c6d5f561e4438.jpg" /></a></td>
    <td className="transcription">{`as to the longitude - the hunters roped the river & [?] that the find a creek of some magnitude 10 or 15 miles from the river & running S.E.\nThursday 8 Remained in bank[s?]\nFriday. At 1/2 past 9 this morning we struck our tents and again [migrated] - our route continuing up the river & bearing N.W. The bluff is from 1/2 to 2 miles from the river & in some places bold & rocky - [paped?] a stream of about 12 feet in width running some force are on the river & [hamlet?]`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>41</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57908"><img src="https://digital.newberry.org/transcribe/omeka/files/original/49829f832dd2f2f9f21cfa6fb06ab031.jpg" /></a></td>
    <td className="transcription">{`with it formed it to be a part of the main river which had washed its way [about?] land resembled a mile [ space / race?] - rested for an hour at a lonely cotton wood here a short distance ashore the head of the [space / race?] there are a large number of islands in the river in this part of it. The country on the opposite side does not now differ maternally from this side except that is rise gradually from the river in & there are a few trees along the river in places - After traveling 12 1/2 miles we encamped at this place the (repeats word?) the river washes the bluff which is`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>42</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57909"><img src="https://digital.newberry.org/transcribe/omeka/files/original/e84ccd6bd5dc693c9fc5205339401c59.jpg" /></a></td>
    <td className="transcription">{`more of a gentle slope from the river that otherwise - saw no Buffalo to day.\nSaturday10_ Our work to day is nearly West. The Islands continue numerous in the river. some of them covered with timber. we have traveled upwards of 13 miles. encamped on the bank of the river. about three miles from this we crossed a deep ravine which makes in from the high ground to the river. Jo Walker unclear out two caches where a party of traders, in whose company he was deposited their merchandise`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>43</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57910"><img src="https://digital.newberry.org/transcribe/omeka/files/original/cbdd882e383d683216f642a5448a38e6.jpg" /></a></td>
    <td className="transcription">{`in the winter of - Now this is a curious formation in the shape of a rock, composed of river sand, gravel & unclear stone. It being at least 50 feet above the unclear of the river, it is a master of speculation, what has caused it - no material change in the face of the country.\nSunday 11. We had proceeded but a short distance this morning before we were compelled to ascend the hills as the river & bluff which is very borken are so near as to obstruct a passage between them. the hollows seem to indicate that`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>44</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57911"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ffc29f966bff3133de800109c3e1332c.jpg" /></a></td>
    <td className="transcription">{`the country is entirely of unclear stone character. quanties? of what appear to be stacked unclear lines the sides of many of them. - many of the cliffs are covered with a white substance, some of which much resembles chalk. After passing three or four miles on the hills, we descended to the bottom of a very beautiful little grove of Cotton wood, which we passed and encamped about a mile above. Mr Brown surveyed on to a tree about a mile above our encampment, where according to unclear by our survey, the boundary line`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>45</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57912"><img src="https://digital.newberry.org/transcribe/omeka/files/original/c40902bfaf486e2015b4f765b03ae629.jpg" /></a></td>
    <td className="transcription">{`unclear the river -- The point unclear at a hundred miles lower unclear as laid down on Robinson's map, but it must be incorrect.\nMonday 12 Having reached the point beyond which our instructions do not warrant us in proceeding, we are waiting to hear from the government. The unclear of war having informed us that authority to proceed would be forwarded to us as soon as arrangements with the Mexican government to that effect should be entered into. The lattitude of this place`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>46</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57913"><img src="https://digital.newberry.org/transcribe/omeka/files/original/90db23685cbd6f03afdb1203f229375a.jpg" /></a></td>
    <td className="transcription">{`is 37.48.37 by unclear the unclear of this day. The probability that we will be detained some time is so great that several hunters were dispatched this morning in pursuit of Buffalo, they not appearing very plentry at this place. the hunters however unclear pretty rich + have brought in a considerable quantity of meat\nTuesday 13 Reading- men engage drying our meat.\nWednesday 14 - Walked up to the boundary line with unclear the latter marked on a tree unclear`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>47</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57914"><img src="https://digital.newberry.org/transcribe/omeka/files/original/03a7370f9b88bba68c745cad06d6b57d.jpg" /></a></td>
    <td className="transcription">{`returned + after dinner a unclear was convened +resolution unclear not to continue the surveying + making of the wood without further instructions and that we would wait 'til the 20th unclear, at which time a definite decision will be made as to our further movements-\nThurdsay 15 last night I was awakened by some animal as I suppose rolling on my blanket thinking it might be one of our dogs, who sometimes take the liberty of comeing in to out tent I was about to drive him out`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>48</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57915"><img src="https://digital.newberry.org/transcribe/omeka/files/original/5cf00ea60f898567150a9896fe166f67.jpg" /></a></td>
    <td className="transcription">{`when to my astonishment found it to be a Spok can? immediately retired under my blanket + the gentleman soon disapeared- Williamns killed him thi morning on the waters edge- several hunters have gone out to day, but from appearances from the hills, over which I have`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>49</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57916"><img src="https://digital.newberry.org/transcribe/omeka/files/original/05d2d4acc9d70b7df37960e7bd57eef8.jpg" /></a></td>
    <td className="transcription">{`unclear17 the board met to day unclear] to return to our own from unclear unclear in case no instructions unclear unclear for us unlear unclear unclear to unclear die this fate =`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>50</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57917"><img src="https://digital.newberry.org/transcribe/omeka/files/original/bd97731e84e6d79bb6872c56a47b0018.jpg" /></a></td>
    <td className="transcription">{`[?] expenses to 20 [?] ~43[?] \n[?] act. to same day 2019\nPaid to Indians [?] ~1000\n[?] [?] Nov 20\n[the rest is illegible appears to be a ledger book page. ]`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924">Thomas Mather diary, 1825-1826</a></td>
    <td>51</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/924/page/57918"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ff711053831a48e9983624e0b8b97c9b.jpg" /></a></td>
    <td className="transcription">{`[Nothing legible]`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>1</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57919"><img src="https://digital.newberry.org/transcribe/omeka/files/original/65ccdc2b5aad1c9f45221c3523fa533f.jpg" /></a></td>
    <td className="transcription">{`Thomas Mather's accounts with the Mexican Road Commissioners`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>2</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57920"><img src="https://digital.newberry.org/transcribe/omeka/files/original/9068a360a378adb9d1d4ad4925804cf8.jpg" /></a></td>
    <td className="transcription">{`Expedition\n1 Blk. Horse - 50.\n1 Gun ditto - 35.\n1 pack Saddle\nwith rope &c.&c. 5.25\n1 75 Shoes sold\nWilliams 2.50\nTemplate:? Cash paid D.\nWorkman for\nrepairs pack Saddle &\nhobbles &c [illegible]] 3.00\n\n _____\n 95.75`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>3</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57921"><img src="https://digital.newberry.org/transcribe/omeka/files/original/b87d6b344954d7c4252d2502ecf89b54.jpg" /></a></td>
    <td className="transcription">{`2\nAccount of moneys\npaid for the Commfsr.\n\n to their joint credit\n\n________________________\nto W. Davis 2.\nD. T. Bohon 95.\nTracy Washington 200.\n\n 297.00\n\n\nThe Newberry\nLibrary`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>4</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57922"><img src="https://digital.newberry.org/transcribe/omeka/files/original/d1cfe219f49632bb42f5a0fb98addcbd.jpg" /></a></td>
    <td className="transcription">{`3 Disbursements made by Thomas Mather for travelling and contingent expenses for himself and some of the hands on a/c of the Mex? Road Commissioners\nCash paid for shoeing horses -- 4.50\nExpences from Kaskaskia to Fort Osage 32.87½\nExpences at Franklin including the boarding of the St. Louis hands unclear means 13 etc 30.75\nExpences from Franklin to Kas 23.\nExpences going and returning from Washington with Treaties 178.37½\nCarried forward -- 269.50`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>5</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57923"><img src="https://digital.newberry.org/transcribe/omeka/files/original/694919f2a5d1fcb900612acc7fc63a44.jpg" /></a></td>
    <td className="transcription">{`4 Amount Brot ford. 269.50\nExpences going and returning from Fayette Aug. 1824 41.52½\nCash paid J. Sweet for keeping horses per bid? 22.50\nCash paid portage 3.47½\n\n337.00\nFrom July 1 to Nov 26 is 149 days\nFrom Jany 1 (going to Washington and returning) to April 1 90 \"\nFrom Aug. 7 to 27 going returning from Fayette 20 \"\n259`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>6</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57924"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a6f63fc9f33e4b2d2a13faeba845f7e7.jpg" /></a></td>
    <td className="transcription">{`Expences going to and returning from Jefferson -- 48.81½\nPaid for my S ditto 12\nCash paid my s. 10\n70.81½\nExpences in going to and returning from St. Louis and while there (estimated at) 20\nFrom Dec 6 to 24 inclusive is 19 days x8 152.\nFrom 29 Dec. to Jany. 14 inclusive 17 days (estimated) x8 136.\nThe above items are entered in the abstract furnished Ms Sibley`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>7</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57925"><img src="https://digital.newberry.org/transcribe/omeka/files/original/660100c5840a4d8bdb8b336df8398c12.jpg" /></a></td>
    <td className="transcription">{`Dr. The Mexican Road Company in\n______________________________\n1825 To sundry articles\n\n furnished see page 1 95.75\n\n-\n\n To unclear see page 2 297.00\n\n-\n\n do. disbursed\n for expenses on page 3 & 4 337.00\n\n-\n\n Services as Comm\n 259 days at $8 page 4 2072.00\n\n1826\nDec. 1 To Ball due 268.25\n\n _______________\n 3070.00\n ______________________\n\nNote In addition to this balance of credit, the commissioners are entitled to a credit\nfor an account against me on their books, as well as some some charges made to \nChin? by W. Hood & Tracy Washington`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>8</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57926"><img src="https://digital.newberry.org/transcribe/omeka/files/original/adc4a5714c7fec2709ecd69a4a2c8689.jpg" /></a></td>
    <td className="transcription">{`account Current with Thomas Mather Co\n________________________________\nby dst. unclear on unclear 3000.00\n1 Sorrel Horse 40\n1 Bay Horse 30\n\n\n ----------------------\n 3070.00\n --------------------\n\n1826 \nDec 1 By Ball due 268.25`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>9</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57927"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a2fc83c8fe95c5a1e02a29e254459bee.jpg" /></a></td>
    <td className="transcription">{`Chase Illmund?\nand 30 unknown —5.73\nF. Mulligan 6.00\nBy unknown with horse?\nat stables —6.85`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>10</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57928"><img src="https://digital.newberry.org/transcribe/omeka/files/original/e765ec18c780988cb8319a7d7188459f.jpg" /></a></td>
    <td className="transcription">{`Take to Chester?\nPete Murphy - 9.40\nHarvey Clindeman - 19.01\nJack Gaston - 15.29\nWm. Morris - 1.50\nW. Bidderback - 1.53\nRobert Tindele - 14.00\n\n _________________\n\nJames Morrow 52.27 no additive of above, and in pencil\n\n\nRob. Smith\nIn Taggert 200.72\nCr Cors 331 - 2 - 6.62`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>11</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57929"><img src="https://digital.newberry.org/transcribe/omeka/files/original/f2f9b3f426bb905e968e0df61a313c3a.jpg" /></a></td>
    <td className="transcription">{`Memorandum\n\n\nIn Robert Hood account against\nthe commissioner is the following items\n_____\nCash to Col. Mather 17.50\nAmt. Thomas Mather account 47.46 1/2\nI suppose the last only is private account\n____\nMy account on the Books of the \nCommissioners is $27.00\nIn Tracy Wahrendorff account $30 is my private matter`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925">Thomas Mather accounts with Mexican Road Commissioners, circa 1825</a></td>
    <td>12</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/925/page/57930"><img src="https://digital.newberry.org/transcribe/omeka/files/original/df1d530b591fbe7be5d128df78d6d3b2.jpg" /></a></td>
    <td className="transcription">{`Back cover, absent text`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>1</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57931"><img src="https://digital.newberry.org/transcribe/omeka/files/original/db2f1117749a282cbdf43b7484d3b882.jpg" /></a></td>
    <td className="transcription">{`Saturday July 16, 1825\npage torn Brown? commenced\npage torn the road at Fort\npage torn one mile and 3/4\n[page torn]] from the\npage torn and pursued\npage torn south west direction -- crossed Little\nBlue about 4 miles above its junction\nwith the Missouri -- The ford is rocky --\nIn descending to the ford one of our\nwaggons upset -- sustained but little injury --\nWe halted at a beautiful spring &\nencamped for the night having traveled\n8 miles -- This is a very rich & fertile country\nand finely watered -- our general course to day\nS. 76 West`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>2</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57932"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ab47e39521c3e4aab9007c6b6d29399d.jpg" /></a></td>
    <td className="transcription">{`Monday 18 In addition to our ?\nparty there are several of page torn\n? settlers, accompany page torn\n-ough? the Blue Country for? page torn\nof selecting land -- the page torn\nfirst quality & the Indian page torn\njust been page torn ?\nof it may be anticipated as page torn\nit is brought into market -- We met\nwith nothing to impede our progress to\nday -- Bohons horse was bit by a rattlesnake,\nwhich detained him a few hours\nthe horse was soon cured & encamped at\na small grove on the right, upwards\nof 11 miles from our last emcampment --\nKilled a heif this evening -- general course\nto day S. 35 1/4 W.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>3</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57933"><img src="https://digital.newberry.org/transcribe/omeka/files/original/13b6a6dab7ed9f7aa77e004b41bd395d.jpg" /></a></td>
    <td className="transcription">{`Tuesday 19 -- Remained in camp\nfor the purpose of drying our\nBeef and making some repairs\nto the waggons -- exchanged horses\nwith one of the persons that accompanied us\nfrom the settlements -- a small party of\nSock? Indians page torn us?\nWednesday 20 We pursued our route\nto the big Blue a distance of 5 1/4\nmiles -- The bluff which we were compelled\nto descend is steep & verry\nrocky -- The waggons got down safe\nThe ford is a good one 20 miles (supposed)\nabove the mouth -- The country\nhere is broken, sterile and rocky -- unfit \nfor cultivation for some distance each\nside of the river -- We however soon struck`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>4</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57934"><img src="https://digital.newberry.org/transcribe/omeka/files/original/eb446bdcae9cfa6c02c5c6205a1c61cc.jpg" /></a></td>
    <td className="transcription">{`the prairies, which were high\nand of good soil -- the prospect\ncommanding -- From the Big\nblue to the State line the distance\nis 4 3/4 miles -- The distance of this\ndays travel page torn -- We crossed the\nState line (of Missouri) on? Latitude\n39.00.20 - Longitude W 94.17. page torn\nand about 9 miles south of the Kansas River\n-- a short distance to our right and within\nthe limits of Missouri, passed an Indian\nvillage which proved to be a temporary settlement of a small party\nof socks -- Col. Reeves, Mr Gamble and\nsome of our men went to it and were\nfriendly received -- We encamped at a\nsmall grove on our left -- some 15 or`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>5</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57935"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a5bbfa15d5708782e7e78a4f0711e71e.jpg" /></a></td>
    <td className="transcription">{`20 of the Indians visited our encampment,\nand were presented with\na small quantity of Tobacco --\nGenl course to day S. 71 1/2 W\nThursday 21 Our route to day is\nthrough an extensive prairie --\ngenerally upon the dividing ridge\nof the Big Blue & Kansas -- one of\nthe hunters (? the old?) killed a deer --\nWe encamped after travelling 13 1/4\nmiles in time to repair one of our\nwaggon tongues -- The flies have been\nso bad to day that the horses are\nmuch cut down -- genl course \nS. 70 W --\nFriday 22 -- Set out early and\ntravelled 9 miles -- The flies continue`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>6</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57936"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ac7870ce3631681bb4ee0e33a0d3add8.jpg" /></a></td>
    <td className="transcription">{`to annoy us very much -- Breakfasted\nand remained during the day --\nThis morning we intersected the\nwaggon road of the Santa Fee traders,\nwho went out in the spring -- They\nhad gone round the head of the Bluer -- We\nare now opposite the source of the\nBig Blue -- The country is quite high\nalmost entirely prairie, only a\nfew scattering trees -- scarcely a\ngrove within the eyes reach of more\nthan an acre or two in extent, and\nbadly watered -- The soil of a midling\nquality -- genl. course S. 26 1/2 W. --\nIn consequence of the flies we\nresolved to travel in the night\nas the moon now affords light --`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>7</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57937"><img src="https://digital.newberry.org/transcribe/omeka/files/original/6cd3ddcf67cdd9f4c25d77f5751e8896.jpg" /></a></td>
    <td className="transcription">{`Saturday 23 We travelled last night from\nsun down 'till 10 o clock turned\nout our horses and lay down\nin the prairie without pitching our\ntents -- rose at sunrise and pursued\nour journey -- encamped at 9 oclk\nAM. Mr Brown, who with the\nsurveying party had remained at\nyesterdays camp 'till this morning\ncame up about 11 oclk -- distance\n14 miles -- general course\nSunday 24 We again set out just\nbefore sun down last evening and had\nnot proceeded far before it became\ndark, the clouds most of the time\nobscured the light of the moon and we`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>8</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57938"><img src="https://digital.newberry.org/transcribe/omeka/files/original/bc21def11b1fb5ba8a7a9af2abaa0bec.jpg" /></a></td>
    <td className="transcription">{`missed the trail and lost our\nway -- Finding ourselves in a\ndeep ravine or hollow we halted\nfor the purpose of making an examination\nof the country on our right\nand left, with the hope of finding\nthe dividing ridge between the\nKansas & Osage waters, on which\nour route lay -- Just as the\nhindmost waggon came up and\nstopped, two of the men who had\nborne off to the right some time\nbefore came up in great haste\nwith the cry of Indians! Indians!\nThe alarm was so sudden that\nit produced some little confusion`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>9</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57939"><img src="https://digital.newberry.org/transcribe/omeka/files/original/d79c5c7f0a485cecc5ec03da2acb68c2.jpg" /></a></td>
    <td className="transcription">{`for a moment -- The report of the\nmen that came in was that they\nhad fallen in with a large\nparty of Indians, two or three of whom\nhad chased them some distance --\nBelieving that if they should prove\nhostile, the surveying party, who\nhad remained behind for the purpose\nof bringing up the survey in the \nmorning, might be troubled by them,\nCol. Reeves & Capt. Cooper with most\nof the men immediately went in\npursuit of them -- I remained with\nthe waggons for the purpose of placing \nthem in a proper posture of defence --\nCol. R. had not pursued more\nthan two or three miles before he`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>10</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57940"><img src="https://digital.newberry.org/transcribe/omeka/files/original/d1c1044233c3c071f05715619d8a9fd5.jpg" /></a></td>
    <td className="transcription">{`discovered that the party consisted\nof Spaniards & our own country\nmen who were returning from\nSanta Fee -- They had been badly treated\nby the Osage Indians a party\nof whom they fell in with on the\nArkansas & who robbed them of 120 mules &\nHorses -- Like our men they also believed\nus to be Indians & gave\nthe first pursuit under that\nimpression -- The manner in which\nour men fled only tended to confirm\nthat belief, & when our party \nwhich went in pursuit of them\ncame in sight they in turn fled --\nThey soon discovered their mistake\nand halted -- mutual explanations`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>11</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57941"><img src="https://digital.newberry.org/transcribe/omeka/files/original/2a2edacb6786de506d2e10df72216645.jpg" /></a></td>
    <td className="transcription">{`took place & the affair turned \nout to be a matter of amusement\nTheir party encamped with our\nsurveying party & the opportunity\nof sending in communications was\nimproved by those of the latters & of\nthe pursuing party who felt thus\ndisposed -- Cap Cooper returned to\nus about 10 oclk in company with\na Spaniard & one of the American adventurers --\nThose of us who had remained\nwith the waggons were gratified to learn\nthat the affair had ended so differently\nfrom what was at first anticipated --\nI enquired of the American if any`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>12</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57942"><img src="https://digital.newberry.org/transcribe/omeka/files/original/c2aa7fdbae012ad94f7d456147b3a3e3.jpg" /></a></td>
    <td className="transcription">{`intelligence had been recd at\nSanta Fee via Mexico relative to\nthe war upon which we were\nengaged -- He informed me there\nwas none; But that an agent from\nthe Mexican Government was in\nthe company he had just left, &\nthat his business was relative to\nthe intercourse between the two\ncountries -- Thinking that this\nperson might have some authority\nfrom his government to negotiate\nrelative to a road, I concluded\n'tho late at night to ride to their\ncamp a distance of about 3 miles`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>13</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57943"><img src="https://digital.newberry.org/transcribe/omeka/files/original/1cd8e5ee4d98db18abd373709591c58f.jpg" /></a></td>
    <td className="transcription">{`and see him -- On my arrival\nI found that Col. Reeves had\nbeen introduced to him & communicated\nwith him on the subject\nof his mission -- The gentleman\nhimself whose name is Manuel\nEscutharo had retired to rest and\nthere was no motive for disturbing\nhim, inasmuch as Col Reeves\nhad ascertained that he\nwas not authorized to make\nany definite arrangement\non the subject of our mission --\nWe returned to camp & after dispatching\nhalf of one our ? to the ?`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>14</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57944"><img src="https://digital.newberry.org/transcribe/omeka/files/original/773fb9611f9ea8aef0f7f75db6246345.jpg" /></a></td>
    <td className="transcription">{`found from an observation this \nevening that we are now in Lat.\n38.46.51 -- distance from our last\nencampment 15 1/2 miles general course\nThe country continues much\nas last described, almost entirely\nhigh & rolling prairies, with an\noccasional skirt of timber extremely\nnarrow, so much so as to preclude\nthe remotest idea of its ever\nbeing settled -- These skirts of timber\nare on our right & left, being on \nthe branches which make \nfrom the ridge to the rivers\nOsage & Kansas`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>15</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57945"><img src="https://digital.newberry.org/transcribe/omeka/files/original/bbdccda46c2f0b2201f7a7bcccff209d.jpg" /></a></td>
    <td className="transcription">{`Wednesday 27. After much consultation\nbetween Col Reeves & myself\nit was resolved to dispatch Mr\nGamble to the Osage village, for\nthe purpose of making an arrangement\nwith those Indians for a meeting\nat some other point than their\nown village, where we had intended\nto have treated with them\nMr G. will if possible make an arrangement\nwith them to meet us\nat the Kaw Spring near the\nArkansas -- The reason which induced\nthis measure, was the utter\nimpossibility of proceeding to their`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>16</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57946"><img src="https://digital.newberry.org/transcribe/omeka/files/original/b5ab1c8175fedb883e8464a2ab69a8d9.jpg" /></a></td>
    <td className="transcription">{`village (which is 80 miles out\nof our route) in consequence\nof the flies, with the expedition\nas we had first intended -- Mr G. is\nalso instructed in case he may be\nable to make the desired arrangement\nwith the Osages, to proceed to the Kansas?\nvillage and make a like arrangement\nwith them for a meeting -- Mr G.\nwith three of the men accordingly set\nout this morning with a view to\naccomplish these objects --\nThursday 28 We left camp last night\nand proceeded 'till 10 oclock when we halted\nin the prairie & stretched ourselves`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>17</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57947"><img src="https://digital.newberry.org/transcribe/omeka/files/original/4fb66c3d1122adb4a074afaf0d90e24d.jpg" /></a></td>
    <td className="transcription">{`on our blankets 'till nearly day\nlight this morning when we again\nset out and travelled 'till 8 oclk\njust as we were getting under way\nlast night we discovered that two\n?, which we had taken from\nthe settlements, had left us -- As they\nhad given us much trouble, and\nthe prospect of game being better\nthan we had anticipated through\nthis part of our route, we did not\npursue them -- one of the young\nmen discovered a male & gave pursuit,\nhe was so wild that it was impossible to\ntake him -- The appearance of`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>18</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57948"><img src="https://digital.newberry.org/transcribe/omeka/files/original/963b14b6058bdd89a6ee45dd1dbe580d.jpg" /></a></td>
    <td className="transcription">{`the country continues as last described --\nduring the day it rained sufficiently\nto check the flies and\nwe again set out at 4? P.M. &\nand proceeded through a very beautiful\ncountry to a creek, leaving\nthe dividing ridge, which we\nhave for some time pursued\nto our right -- In descending\nto this encampment the scenery\nis truly sublime -- We encamped\non this creek haveing\ntravelled since last night 21 miles --\ngeneral course\nFriday 29 The rain had dissipated`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>19</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57949"><img src="https://digital.newberry.org/transcribe/omeka/files/original/3347a663ef1a44dbb7bb9f513a2e1c03.jpg" /></a></td>
    <td className="transcription">{`the flies to such a degree this\nmorning that we were able to\npursue our journey without\nmuch molestation from them\nnine miles from last nights camp\nwe came to creek of considerable size\nwhere we rested for a few hours -- This\nis a branch of the Osage river -- The\nparty that went from Franklin to\nSanta Fee last spring had thrown\na bridge across the creek and\nexpedited our crossing considerably.\nWe marked a tree on the bank\n\"distance to Fort Osage 119 miles\" -- We\nleft this place at 4 pm. & travelled`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>20</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57950"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0e0833d5e7b741a8f8476ce0f8d1174e.jpg" /></a></td>
    <td className="transcription">{`4 3/4 miles to another creek of\nconsiderable size and encamped\nfor the night having made 13 3/4\nmiles -- The soil and general appearance\nof the country is much \nbetter for the last 20 miles than\nwe have passed for some time,\nthere are many groves of\ntimber in different directions\n& an abundance of water\n-- general course\nSaturday 30. After experiencing\none of the most tremendous gales\n& alarming thunderstorm, during\nallmost the whole night, we set out`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>21</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57951"><img src="https://digital.newberry.org/transcribe/omeka/files/original/416719b6b5ab943b2799b4164df5a0d8.jpg" /></a></td>
    <td className="transcription">{`this morning early and proceeded\nsome distance before breakfast\nthe soil continues of a good\nquality & the groves of timber\n& streams of water are sufficient\nto admit of some settlements --\nAs we were about entering?\nour journey to day, one of the\nwaggon tongues gave way & we\nwere compelled to encamp for the\nnight -- distance to day 2 miles -- \ngenl course\nSunday 31. We travelled to day\nthrough a fine country of land\npassing two or three creeks of \nrunning water, the banks of which`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>22</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57952"><img src="https://digital.newberry.org/transcribe/omeka/files/original/8f5854e24e2384857f9c281b2330a0c4.jpg" /></a></td>
    <td className="transcription">{`as well as the small water course\nhave considerable timber such\nas Walnut, Hackberry, Elm &\nsometimes oak -- Encamped on\none of these having travelled 10 ?\nmiles - genl. course\nMonday August 1. Set out\nearly & travelled over a beautiful\nprairie, in descending \nto a creek, some of us who \nwere in advance of the\nwaggons discovered some Elk\nnear it -- pursuit was made\n& three of them taken --\nwe encamped for the purpose`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>23</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57953"><img src="https://digital.newberry.org/transcribe/omeka/files/original/fd933e25103e1fb4cc3bde655184c7c1.jpg" /></a></td>
    <td className="transcription">{`of drying our meats -- We\nnamed this creek the Elk fork of\nthe Osage & marked upon a\nlarge tree \"distance to fort\nOsage 140 miles -- Bohon was\naccidentally wounded just below\nthe knee with an axe by one\nof the men & I fear badly -- The\nLattitude at this place is 38o.41.52\nvariation of the needle 11o.38' E dis 2 3/4\nmiles\nTuesday 2 Our Horses requiring\nrest, we remained in camp this\nday --\nWednesday 3 This morning Maj.\nSibley who had been detained\nat Fort Osage came up with`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>24</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57954"><img src="https://digital.newberry.org/transcribe/omeka/files/original/308463364e5029eb0235b428075f956e.jpg" /></a></td>
    <td className="transcription">{`us -- our horses not being sufficiently \nrested & Col Reeves\nbeing somewhat unwell we\nremained in camp this day\nThursday 4. Set out early & travelled\nover a high prairie -- soil 2d & 3d qy\nat about 8 oclock stopped for\nbreakfast on a small creek --\nrocky bottom -- supposed to\nbe a branch of the Nee-ozho\n-- continued our journey\nover a high, rolling, flinty &\nrocky prairie -- as we were ascending\none of the hills we met one of\nthe young men who had`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>25</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57955"><img src="https://digital.newberry.org/transcribe/omeka/files/original/4b7e1d455c5bd53e160a8f6e75522879.jpg" /></a></td>
    <td className="transcription">{`accompanied Mr Gamble to\nthe Osage villages & who\nhad been dispatched from\nthere by him with the\ngratifying intelligence that\nthe chiefs & head men of\nthe Osages would meet us\non the Neeozho -- we encamped\nupon a branch of\nthat river having travelled\n13 miles -- Genl course\nFriday 5 We renewed our journey\nat an early hour and reached\nthe Neeozho in a distance\nof 6 3/4 miles over the same`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>26</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57956"><img src="https://digital.newberry.org/transcribe/omeka/files/original/52ead8a369250fee9f37fdda45ca9fa0.jpg" /></a></td>
    <td className="transcription">{`kind of flinty prairie as yesterday --\nHere we encamped for the purpose of treating with\nthe Indians, as we expect them\nin the course of two or three\ndays -- Genl. course\nSaturday 6 -- We have named \nthis place \"council grove\" It \nis a beautiful situation and\ncalculated for considerable\nsettlements -- a spring is discovered\nin the prairie but a little\ndistance from our camp &\nthe range for our horses is\nexcellent -- Mercury in Farenheit\nThermometer at sunset 86\"`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>27</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57957"><img src="https://digital.newberry.org/transcribe/omeka/files/original/5c4c51aec64cb3a99c260686a889b0c5.jpg" /></a></td>
    <td className="transcription">{`The country does not seem\nto abound in game, probably\nfrom the circumstance of the\nIndians frequently ranging\nhere -- We however procure without\nmuch difficulty a sufficiency \nof deer & Elk meat --\nSunday 7 Two of the young\nmen to day while hunting\ndiscovered a small party of Indians\none of whom came to them --\nIt was not ascertained to what\nnation they belong, but we\npresume that they are a hunting\nparty, either of the Osages or Kansas`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>28</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57958"><img src="https://digital.newberry.org/transcribe/omeka/files/original/612d07619a16d85d7156d3553a103bc8.jpg" /></a></td>
    <td className="transcription">{`the village of the former being\non this river about 80 miles south\nEast of this place & that of the\nlatter on the Kansas River about\nforty miles north of this --\nMonday 8 -- Mr Gamble arrived\nat our camp this evening with\n40 Indians of the Great & Little\nOsages & Mr W. S. Williams an\nInterpreter -- They encamped\nwithin a few rods of us & were\ninformed that we would hold a\ncouncil with them tomorrow --\nTuesday 9 -- We had a conference\nwith the Indians`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>29</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57959"><img src="https://digital.newberry.org/transcribe/omeka/files/original/dd4bfb464250113216ae378e74e4b510.jpg" /></a></td>
    <td className="transcription">{`and Mr Sibley on the part of\nthe Commissioners explained to them\nthe views of our government\nrelative to the road through their\ncountry & that we had called\nthem to us for the purpose\nof procuring their consent to\nthe marking & uninterrupted\nuse of the road -- And further,\nproposed to give them in consideration\nof their acceding by treaty to our proposition\n$300 in merchandise at the\nsigning thereof and $500 payable\nin St Louis or at Chouteaus trading\nhouse near they village -- After`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>30</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57960"><img src="https://digital.newberry.org/transcribe/omeka/files/original/283bf92da23099a5df63907d68281329.jpg" /></a></td>
    <td className="transcription">{`some consultation several of them\nreplied, commencing with the\nchief of the G. Osages -- all of them\nexpressed their assent to the proposition\nand their willingness to\nexecute the treaty -- we separated\nfor the purpose of preparing the\npapers to hold another council\ntomorrow --\nWednesday 10 To day the Indians\nwere again assembled with us in\ncouncil and after minutely explaining\nto them through the\nInterpreter each article of the\ntreaty it was signed by the Commsr`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>31</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57961"><img src="https://digital.newberry.org/transcribe/omeka/files/original/203b782e1288f5ff3b639883db36a904.jpg" /></a></td>
    <td className="transcription">{`and chiefs & the head men of the\ngreat & Little Osages & the mdse\ngiven to them as stipulated\nall seeming satisfied with the\narrangement -- It being necessary\nto take an Interpreter with us\nand not as yet haveing employed\nany, we hired Williams at the\nrate of $400 a year, to accompany\nus --\nThursday 11 After dispatching\nour Interpreter to the Kansas village\nfor the purpose of procuring a\nmeeting with that nation at some\nconvenient place on our route`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>32</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57962"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0dec4b1ef9ea3de1648ca58f722a5c27.jpg" /></a></td>
    <td className="transcription">{`we again struck our tents and\nproceeded on our journey -- In\na short distance we discovered a\nlarge gang of Elk -- After a long\nchace five of them were killed --\nWe passed no timber to day and\nbut one little run of water -- We\ntravelled 16 1/2 miles and came\nto a few scattering trees and a\nsmall branch of water, where\nwe encamped & soon had the\ngood fortune to discover one of the\nfinest springs I most ever beheld -- It\nwas a great luxury -- The prairies`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>33</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57963"><img src="https://digital.newberry.org/transcribe/omeka/files/original/bd1d646bd527e5ddab7fdfa7aa69901d.jpg" /></a></td>
    <td className="transcription">{`are becomeing more extensive,\nand, timber & water scarce -- soil\nof inferior quality ---\nFriday 12 -- It was concluded \nto leave this spring without drying\nour meat -- It was therefore for the\nmost part thrown away, with the\nexpectation that we shall meet with\nBuffalo in a day or two -- we travelled\nthrough an allmost boundless prairie\nan in about 10 miles found a little\nwater & two or three cotton wood trees,\n-- beleiving we might within a\nreasonable distance, find better\naccommodations for an encampment\nwe proceeded, but to our dissapointment`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>34</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57964"><img src="https://digital.newberry.org/transcribe/omeka/files/original/e2d2ee7391e46b5e722d1a478d45670d.jpg" /></a></td>
    <td className="transcription">{`after travelling 10 1/2 miles farther\nmaking 20 1/2 miles we were\ncompelled to encamp on a\nsmall creek, with but one\nsolitary cotton wood tree, this\nwas cut down and furnished\nwood for cooking -- Genl course\nSaturday 13 -- Dispatched\nan additional number of\nhunters in advance & set out\nat an early hour -- we reached \nin the distance of nine miles\na creek of considerable size & a\ngrove of cotton woods -- This stream\nis supposed to be the Cotton Wood\nfork of the Neeozho -- on`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>35</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57965"><img src="https://digital.newberry.org/transcribe/omeka/files/original/3de0e9a19ac7cbb6210dacf889155f58.jpg" /></a></td>
    <td className="transcription">{`our arrival at the grove we\nfound the Hunters had got in\nbut with no game -- pitched\nour tents for the night -- There\nhad been a short time since a\nlarge body of Indians encamped\nat this place -- supposed to be\nthe Osages returning from their\nBuffalo Hunt -- a deer came in\nsight of our camp and was taken\nby our hunters -- this served us\nfor meat -- The winds are very \nhigh during the day & night -- Is it\nusual? For two or three nights\nthere has been no dew -- Genl\ncourse`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>36</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57966"><img src="https://digital.newberry.org/transcribe/omeka/files/original/b752f7ed6fdb748a85f2c656b2580f37.jpg" /></a></td>
    <td className="transcription">{`Sunday 14 -- A remarkably\ncool morning -- We set out\nafter an early Breakfast\nand passed over a beautiful\nprairie -- No timber in sight\nand no appearance of water\nfor a long distance -- We\ncrossed the dividing ridge\nbetween Neeozho & Little Arkasas\nEncamped on a small creek\nin the open prairie -- Buffaloe\nmanure our only fuel -- distance\n20 miles Genl. course\nThe scarcity of timber &\nwater has been such for this`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>37</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57967"><img src="https://digital.newberry.org/transcribe/omeka/files/original/265ffff99be625765b05451709bc17d1.jpg" /></a></td>
    <td className="transcription">{`and some three or four preceeding\ndays that we have\nbeen compelled to make long\nstages -- our horses are sensibly\naffected by it, and many are\non the point of failing entirely --\nJust after dark our Interpreter\ncame up with two Kansas\nIndians, haveing left some\nfour or five miles behind\nforty or fifty more of that\nnation -- They will join us\nto morrow, but we shall be\ncompelled to proceed 'till we find\ntimber, before we can treat\nwith them`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>38</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57968"><img src="https://digital.newberry.org/transcribe/omeka/files/original/2d8afb5d010895635a9fd1c73ba895a0.jpg" /></a></td>
    <td className="transcription">{`Monday 15 Left our encampment\nat an early hour\n-- Capt Cooper thinking that\nthe hunters might get into the\nBuffalo range to day -- went with\nthe hunters & I remained in\ncharge of the waggons in his place\n-- We had proceeded but a few\nmiles before the Indians came\nup -- They manifested great\nimpatience, and expressed a\nstrong wish for us to turn\nto our left three or four miles\nwhere a grove of timber was \ndisernable -- I assented and\non reaching it found Col. R &\nMaj. S. with the hunting party`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>39</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57969"><img src="https://digital.newberry.org/transcribe/omeka/files/original/4403441e08f3800fe6e068868d800919.jpg" /></a></td>
    <td className="transcription">{`they had been several\nmiles on the trail &\nfinding no appearance of\ntimber returned to this\nplace -- Here we pitched\nour tents & the Indians\nalso encamped -- This evening\nheld a talk with the\nIndians who readily assented to\nour proposition, which was similar\nto the one made to the\nOsages, and likewise expressed\ntheir joy that such a measure\nas the marking a road\nin the vicinity of their villages\nwas in progress -- distance 13 m\ngenl course`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>40</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57970"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7e2688fc2079c5db4f941b3cae0ebce8.jpg" /></a></td>
    <td className="transcription">{`There were 57 Kansas &\ntwo Otloes -- We made some\nsmall presents to the latter\nTeusday 16 This\nmorning the Indians were\nassembled and the chiefs and\nhead men signed the treaty\nafter it was duly explained\nto the whole party in council\nassembled -- The merchandise\nwas delivered to them & an\norder for Five Hundred dollars\nworth more on Messr Curtis &\nEly -- These Indians I suspect\nhave not been so\nmuch in the habit of receiving`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>41</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57971"><img src="https://digital.newberry.org/transcribe/omeka/files/original/fa8e19180ea1e84cd27cb049fd1c5814.jpg" /></a></td>
    <td className="transcription">{`presents & annuities as the\nOsages, as they had considerable\nstrife and excitement\nrelative to the distribution\n-- on the other hand the Osages\nproceeded with the most perfect\nregularity in their division &\nall were satisfied -- They appointed\ntwo distributors, and these made\nan equitable division -- The remainder\nhad nothing to say -- After concluding\nour business we departed,\nleaving the Indians disputing\nabout their goods -- We\ntook our course for the\nArkansas without reference\nto the trace of Santa Fee`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926">Thomas Mather diary, 1825</a></td>
    <td>42</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/926/page/57972"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a16c0371ef9ec28b32fc81e6b56f7dbd.jpg" /></a></td>
    <td className="transcription">{`traders, which we had\nfollowed most of the way\nand which was now considerably\nto our right -- We\nreached the little arkansas &\nencamped -- Our hunters came\nin haveing killed severall\nBull Buffaloes -- The meat\nthey brought in was of inferior\nquality, the animal being\npoor at this season of the year\nThe cows are said to be fine --\nwe expect to be among them\nin a day or two -- distance\n12 1/2 miles -- The country\nthrough which we passed to`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>1</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57973"><img src="https://digital.newberry.org/transcribe/omeka/files/original/06d98c73a5f685f7b34ccba35d650275.jpg" /></a></td>
    <td className="transcription">{`Department of War\n16th March 1825\nGentlemen,\nThe two-fold duties which are assigned to you, of treating with Indian Tribes, and marking a road from the boundary line of the United States to the frontier of Mexico, will require to be kept distinct in your disbursments, in carrying each into effect, with the view of confining to the two branches of this Department the correspondence and the accounts relating to each, to that of the Engineer Department those which relate to a survey and marking the road and the disbursments made in the execution of this branch of your trust; and to the Office of Indian affairs those, which relate to Treaties with the Indian Tribes, and the disbursment of the appropriation made by Congress for this object.\nThe sum of ten thousand dollars is appropriated to defray the expenses of surveying`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>2</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57974"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0239c135576e65e48244508c41cabf4d.jpg" /></a></td>
    <td className="transcription">{`and marking the road. Your disbursments, under this head of appropriation, will embrace your own pay as commissioners, which is fixed, for this branch of your service, at five dollars, each, per day, whilst actually engaged in surveying and marking the road, for the pay of a surveyor, chain carriers, markers and Hunters & all other necessary expences.\nThe appropriation is in no event to be exceeded.\nThe object of the Act of Congress is specific, no instructions, in detail, are necessary, therefore to be givin, except in making your report in full, in your field notes, and platt of the road in which you will be full and explicit, in remarking upon the discription of country throug which you may pass; the Rivers and Creeks, which may cross it &c &c. The form of making up, and vouching your accounts, will be the same as is directed to be observed in my letter of this date relating to the Treaties which you may enter into with the Tribes through whose country the road may pass.\nYour compensation, as commissioners, will`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>3</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57975"><img src="https://digital.newberry.org/transcribe/omeka/files/original/542599888bc0a512f419b1eccbcb98ba.jpg" /></a></td>
    <td className="transcription">{`be, as you are informed, three dollars, each, and five dollars per day, for your Secretary, whilst actually engaged in Treating with the Indians; and five dollars a day for each Commissioner, whilst actually engaged in surveying and marking the road.\nIt is in the meaning of these instructions to allow you a compensation of eight dollars a day, each, whilst engaged in the two fold duties assigned to you, and five dollars a day for a Secretary whilst engaged in Treating with the Indians.\nThere is no compensation for a Secretary provided for in the estimate upon which the appropriation is made for surveying and marking the road.\nI have the honor to be &c\nSigned, James Barbour\nTo\nBenj. H. Reeves\nGeorge C. Sibley\nP Menard`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>4</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57976"><img src="https://digital.newberry.org/transcribe/omeka/files/original/604a338755ea372ee732eb1bfa82248c.jpg" /></a></td>
    <td className="transcription">{`War Department\nOff. Ind affairs\nThomas Mather Esqr John Mclean\nR M E?\nKaskaskia\nIllinois`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>5</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57977"><img src="https://digital.newberry.org/transcribe/omeka/files/original/929bc33d7f2f3a4f6ae71aa006b9c04b.jpg" /></a></td>
    <td className="transcription">{`Copy War Department\n\n March 16\" 1825\n\nGentlemen\nThe two fold duties which are assigned to you of treating with Indian Tribes, and marking a road from the boundary line of the United States to the frontier of Mexico, will require to be kept distinct in your disbursements in carrying each into effect, with the view of confining to the two branches of this Department the correspondence and the accounts relating to each; to that of the Engineer Department those which relate to a survey & marking the road & the disbursements made in the execution of this branch of your trust; and to the Office of Indian Affairs those which relate to Treaties with the Indian Tribes, and the disbursement of the appropriation made by Congress for this object. The sum of ten thousand dollars is appointed to defray the expenses of survey & marking the road. Your disbursements under this head of appropriation will embrace your own pay as Commissioners, which is fixed for this branch of your service, at five dollars each per day while actually engaged in running & marking the road, and for`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>6</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57978"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0db529f489b697fe3209fbfa316e96d4.jpg" /></a></td>
    <td className="transcription">{`the pay of a surveyor, chain carriers, Hunters and all other necessary expenses. The appropriation is in no event to be exceeded.\nThe object of the Congress is specific, no instructions are necessary therefore to be given, except in making your report in full in your field notes of plat of the road, in which you will be full and explicit, in marking the description of country through which you may pass, the Rivers & Creeks which may cross it &c &c. The form of making up & vouching your accounts will be the same as is directed to be observed in my letter of this date relating to the Treaties which you may enter into with the Tribes through whose Country the road may pass. Your compensation as commissioners will be as you are informed, three dollars each, & five dollars pr. day for your Secretary whilst actually engaged in Treating we the Indians; and five dollars a day for each Commissioner, whilst actually engaged in surveying & marking the road. It is in the meaning of these instructions to allow you a compensation of eight dollars a day each, whilst engaged in the two fold duties assigned to you; & five dollars a day for a Secretary`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>7</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57979"><img src="https://digital.newberry.org/transcribe/omeka/files/original/d5f924fd4b725858b485a47b054096a5.jpg" /></a></td>
    <td className="transcription">{`whilst engaged in treating with the Indians. There is no compensation for a Secretary provided for, in the estimate upon which the appropriation is made for surveying and marking the road.\nI have the honor &c & &c\n(signed) James Barbour\nTo\nBenj. H. Reeves\nGeo. C. Sibley &\nPierre Menard Esqrs\nCommissioners &c\nNote. P. Menard having resigned & Thomas Mather Esq having been appointed by the President in his stead, he will be govern'd accordingly by the foregoing instructions.\nBy order\nTho. L. McKenney`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>8</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57980"><img src="https://digital.newberry.org/transcribe/omeka/files/original/2fe3ef12e5b94e8d8fc0ed4b9c8f4e08.jpg" /></a></td>
    <td className="transcription">{`Department of War\nOffice of Indian Affairs\nJune 3d 1825\nTo \nThomas Mather Esqr\nSir\nThe President of the United States has appointed you a Commissioner (in place of Col. P. Menard resigned) conjointly with George C Sibley and Benjn H Reeves Esquires to carry into effect the objects contemplated by the Act of Congress of the 3rd March last authorizing the President to cause a road to be marked out from the western frontier of Missouri to the confines of Mexico, and to hold Treaties with certain Indian Tribes.\nYour Commission and copies of the instructions issued to the other members of the Commission will be forwarded to you at St. Louis.\nI have the honor to be\nVery Respectfully\nYr ob. Sert\nTho. L McKenney\nP.S. The Secty of War is absent on a tour of inspection &c or this letter wou'd have had his signature.\nThMcK`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>9</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57981"><img src="https://digital.newberry.org/transcribe/omeka/files/original/5b76964f02998ee551defdfa8493a177.jpg" /></a></td>
    <td className="transcription">{`Depmt of War\n4th June 1825.\nSir,\nIn the absence of the Secretary of War the President of the United States directs me to transmit to you the enclosed Commission of Commissioner under the Act therein named, and copies of letters of instructions to the Commissioners previously appointed under the same Act, which you will regard as your instructions in the discharge of the duties assigned to you. Should the other Commissioners have proceeded to the frontier of Missouri to enter on their duties you will join them with as little delay as possible.\nI have the honor to be\nYr Ob St.\nC. Van de Venter\nChief Clerk\nThomas Mather, esqr\nSt. Louis, Misso.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>10</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57982"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0da89068e0e67e1e674fc5a7d9600095.jpg" /></a></td>
    <td className="transcription">{`Fort Osage July 16, 1825\nThe pleasure I take in addressing a few lines to you my lovely friend would be much heightened by the reflection that they would call a response from you -- But my evil genius must not only deprive me of the society of my friends but deny me the satisfaction even of hearing from them -- It is only two weeks since I bid you adieu, but months never seemed longer to me -- Can you imagine the cause? -- My journey hither has not been unpleasant, and as for Fort Osage 'tis the most delightful spot west of the mountains -- I arrived here on Monday last and have spent the week at the residence of Mr Sibley, who has a very beautiful situation at this place --\nTomorrow we set our faces westward, with the expectation of seeing no civilized being except of our own party 'till our return to this place which will probably be in December next -- \nI am pleased with my colleagues`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>11</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57983"><img src="https://digital.newberry.org/transcribe/omeka/files/original/147a5400fe6c6d14780934d9e74d6968.jpg" /></a></td>
    <td className="transcription">{`and with our Secretary & Surveyor all of whom are very agreeable and intelligent men - Our equipment is such as to render those attached to the expedition as comfortable as possible; and there is nothing in the prospect before me that gives me a single pang, except the consciousness that every days journey carries me farther from those allied to me by the ties of kindred & affection, and particularly from you my loveliest and dearest friend --\nIt is possible (though I think I hope improbable) that we may be obliged to take up our winter quarters in the Mexican Territory, in which event our return will be procrastinated 'till June or July next -- I mention this, that, should we be compelled to be so long absent, you may not attribute it to any cause but imperious necessity -- Should this be the case the only consolation I should experience, would be the conviction, that nothing short of doing all the duty I owe my government & country, would meet your approbation --\nAdieu then dearest girl, but remember that those anticipations which beguile the tediousness of my way, and strews`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>12</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57984"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7b88db7cd9cc7b3fb69c0c8d0e82bc4b.jpg" /></a></td>
    <td className="transcription">{`my path with flowers, are those which you and you only can say shall be realised\nGive my love to Ann -- remember me affectionately to your mother, brothers & sisters and believe me most sincerely\nYours\nThomas Mather`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>13</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57985"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ee9b14b0885a418ccdf67552a97699c9.jpg" /></a></td>
    <td className="transcription">{`Miss H. G. Lamb\nKaskaskia\nIllinois`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>14</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57986"><img src="https://digital.newberry.org/transcribe/omeka/files/original/16099a7cc51508ada9f18ecc6273eb59.jpg" /></a></td>
    <td className="transcription">{`Vandalia Jany 4, 1825\nI cannot permit the opportunity afforded me by the return of Mr. Owen, to pass, without writing you a few lines my dearest Hannah altho it is but a very few days since I left you -- My journey to this place was not so very unpleasant as you might have imagined from the whistling of the wind on Sunday -- true I was alone but my thoughts and anticipations were all with you -- Tomorrow I leave here in company with Mr Starr and shall accompany him as far as Cincinnatti -- The information I have obtained since I arrived here induces me to take that route -- 'tis said to be much the best.\nI shall hasten to Washington as it is there I expect first to hear from you -- remember me affectionately to mother, brother, & sisters, and be assured of the unceasing devotion of him who now for the first time subscribes himself you affectionate Husband\nThomas Mather`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>15</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57987"><img src="https://digital.newberry.org/transcribe/omeka/files/original/c49a9f629cd8b02c7d4a6ea40270d368.jpg" /></a></td>
    <td className="transcription">{`Mrs. Thomas Mather\nKaskaskia \nIll.\nJW? Owen`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>16</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57988"><img src="https://digital.newberry.org/transcribe/omeka/files/original/14c5e140743a975533127f84f256f538.jpg" /></a></td>
    <td className="transcription">{`S Louis January 10th 1826\nDr ?\nAfter congratulating you on the happy change in your relations to Society by your late marriage, I wont take the liberty to ask if it is your intention to face the Big Prairie next spring. I wish to know it on Sibleys account, for if Reeves should decline going and you delayed notifying the Executive untill the spring, the arrangements made with Sibley could not be carried into effect, and would place him in a most embarrassing situation -- you will oblige me by stating your views upon this subject as early as convenient.\nRespectfully yr obt servt.\nA Gamble\nColn Thomas Mather`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>17</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57989"><img src="https://digital.newberry.org/transcribe/omeka/files/original/f6396e066bf24828e78d1c1702edc5da.jpg" /></a></td>
    <td className="transcription">{`S Louis Mo.\nJany. 14\nColn Thomas Mather\nKaskaskia\nIllinois`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>18</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57990"><img src="https://digital.newberry.org/transcribe/omeka/files/original/e30b5ca15194875965993ef7727bc6ea.jpg" /></a></td>
    <td className="transcription">{`The following is a list of articles that I think it will be proper for Cols. Reeves and Mather to bring out with them to Santa Fee; exclusive of what they may lay in for their own use, on their way out (to wit.)\nOne piece of Scarlet cloth such as costs at St Louis abt $2.50 pr yd\none piece of Blue . . . ditto . . . . $2.00 pr yd\nTwo pieces of Salampores or very gay patterns\nOne piece of wide bleached power Loom shirting 22 to 25 cts a yd\nThree Dozen printed cotton hkfs; or shawls of very gay colour\nsuch as will cost about $3.50 a Doz. at St Louis.\nOne Groce, or four rolls broad scarlet gartering.\nTwo rolls of two inch Ribbons gay coloured.\nTwo dozen paper Looking Glasses.\nTwo dozen best Butcher Knives.\nTen pounds of China vermillion.\nFifty pounds of common plub Tobacco at 6 1/4c a pound\nOne chest of Duponts best rifle powder 6 Doz. canisters\n$47 and as much Lead as will serve to use with it / I have flints\nOne hundred pounds of lump or Loaf sugar.\nOne hundred pounds of good Coffee.\n$90 Ten pounds of best Tea.\nOne Dozen bottles of first mustard\nTwo ounces of Tartar Emetia\n$5 One do. of calomel\nOne dozen of genuine pills\nTools and camp equipage (viz)\nTen good sharp Axes with two handels to each\nFive pounds of hammered nails of different sizes.\nOne thousand horse shoe nails.\nForty yards of good tow linnen for waggon covers.\nTen good strong twilled bags.\nHalf a Dozen horse collars.\n[written along left margin]\nThese will not cost exceeding $180 packed`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>19</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57991"><img src="https://digital.newberry.org/transcribe/omeka/files/original/aca2bb2e8a7fd29c300390ca631f0d33.jpg" /></a></td>
    <td className="transcription">{`Some leather and waxed thread to repair harnessings\nA sufficiency of Kettles, pans, cups for camp use\nThe foregoing list will probably cost abt $400 to fill it\nwhich sum is within my estimation for this item of\nexpence.\nBesides the above which I propose to be packed up for our use upon our return home from here I presume such other tools such as spades, axes &c &c as may be needed on the way out here will be brought; the greater part of which I suppose to be on hand.\nThis list particularly the first items of $180 cash is predicted on the supposition that our fund will not be augmented by congress, and that no farther Indian negotiation will be necessary\nCopy G C Sibley\n\n Santa Fee 7th Feby 1826\n\nSan Fernando Tous? 14th Feby 1826\nTo B H Reeves &\nThomas Mather Esqs\nCommissioners &c\nGentlemen\nEnclosed you will find a list of mules, horses and other public property, that I send you by the party under the direction of Capt Brannin; that starts from this place tomorrow morning for Missouri; and also a statement shewing the precise state of those six men's accounts since the 22nd of September last. Besides the six men I send there are about I believe twelve or fifteen others; all well mounted and equiped, the greater number of whom I understand intend returning here in the spring with the very first caravan. Upon examination of the waggon No 1 I think I will not sell it as I mentioned I expected to do; in one \nwritten along upper left margin\nsome of these are on hand the ballance will cost abt $75.00`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>20</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57992"><img src="https://digital.newberry.org/transcribe/omeka/files/original/51d712ac13063df5b1c862aa26639d7d.jpg" /></a></td>
    <td className="transcription">{`of my letters from Santa Fee. so that it will not be necessary for you to bring out but one waggon, if you should think with me that there will be sufficient for our service on our return home from here next summer. Mr Paul Balio who goes in with this party thinks he will purchase the other waggon if you should conclude to sell it, and I have said to him the he should have the refusal of No 4 of No 6 at a fare price as you and he may agree; provided it is not previously engaged.\nI omitted to insert in my list of articles to be brought out, half a dozen common cheap bridles, which I thank you to add, and bring with you. I have nothing further to communicate; and am very respectfully\nCopy Yr obt. Sevt,\n\n G C Sibley\n\nSan Fernando 15th February 1826\nMessrs Reeves & Mather\nCommissioners &c\nGentlemen\nsince I closed my other letters and packed them away I have paid Capt. Brannin $8 50/100 on account which amount now stands charged agst his wages since the 22nd of Sept. I have paid each of the six men in full for their subsistance up to the 1st April at the rate of $5 ea; per month. Altho nothing has been said about it I consider that the pay of these men will be of course suspended for the time between their arrival home and their commencing service again in the spring.\nI have let Mr Boggs have one of the horses he engages either to furnish Capt Brannin a good pack mule or to settle for the horse with you at $40\nI have directed Capt Brannin to deliver all the mules, saddles &c to Col. Reeves except two that John Walker has charge of which I considered had`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>21</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57993"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0bcaabb3d81e3b19232d08c42944ec3d.jpg" /></a></td>
    <td className="transcription">{`better not be taken lower than Fort Osage -- Walker will take care of them and be allowed reasonable compensation for it. One of the mules mentioned in my list got away last night and I suppose has run back to Santa Fee where I purchased it.\nstill the complement of 14 in all is made up by the arrangement with Mr Boggs.\nIt just occurs to me to mention that a thousand saddle tacks will be wanting which please to add to the list. I am very respectfully \nCopy Y. mo. obt. svt\n\n G C Sibley\nSan Fernando 16th Feby. 1826\n\nTo Messrs B H Reeves &\nThomas Mather Esqs\nCommissioners &c\nGentlemen\nI beg leave to introduce to you Mr Paul Ballio to whom I am under obligations for his assistance on many occasions since I came here. If Mr Ballio should conclude to take one of the two waggons No 4 or 6 as I mentioned he probably would in another letter to you, and you and he can agree as to the price; I have arranged with him to pay for it here, so that you may charge the price of the waggon to my account. I have a settlement to make here with Mr Ballio for corn already received from him, and for wheat bargained for to make flower for our journey.\nThe waggon will therefore be charged to that account. Wm. S. Williams has given Mr Ballio an order on me for $58; and Jno. S. Davis another for $70 on acct of their wages, and I have drawn this day on Tracy and Wahrendorff for $128 (the amt. of these two orders) favr. of Mr Ballio payable at ten days sight Be pleased to direct the dft. to be paid and charge it to Williams & Davis as above stated.\n\n respectfully\n\nCopy Y. mo. obt svt\n\n G C Sibley`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>22</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57994"><img src="https://digital.newberry.org/transcribe/omeka/files/original/17c22402878dc4f368b5c2e77868076d.jpg" /></a></td>
    <td className="transcription">{`Copy of a communication fro Mr G C Sibley\nTo Benjamin H Reeves and \nThomas Mather Esqrs\nU S Commissrs &c\nValey of Tous in New Mxo May 20th 1826\nGentlemen\nI fully expected that I should by this time have been authorized to announce to you, the assent of the Mexican Government to the survey and completion of the Road we have in hand, from the boundary of the U. States to this frontier. But I am obliged to suffer this last opportunity of writing you to pass, without haveing it in my power to give you that very desireable inteligence -- very soon after my arrival here last fall, I addressed a letter to Mr Poinsett, on the subject of the proposed Road, to which I received his answer on the 26th of February last, on the 5th of March I again wrote to him on the same subject and shall expect an answer from him difinitively by the 1st of July at farthest -- enclosed you have copies of Mr Poinsetts letter to me and my last to him -- As there cannot exist any good reason for protracting this affair beyond the present season I am pretty well persuaded that the Government of Mexico will have seen the absolute propriety of giveing its consent to the proposed measure when it was apprised by Mr Poinsett, and the Governour of this Teritory of the progress already made and the expences already incurd on the part of the U States. There will be three mails from Mexico to St Fee before the 1st of July one on the 28th of this month one on the 13th and another on the 28th of April I shall expect you to arrive here early in July but as it is not very probable that we can set out upon the journey homeward sooner than the 15th there will still be another prospect of hearing from Mr Poinsett by the mail of the 13th yet should so happen that his letter does not arrive sooner -- Upon the whole, after considering the subject very maturely? I give`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>23</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57995"><img src="https://digital.newberry.org/transcribe/omeka/files/original/857d255b03cc77daf3aa04f91c209bfa.jpg" /></a></td>
    <td className="transcription">{`it as my opinion that the U S Commissioners ought to meet here as early in July as practicable -- and that they have good reasons to believe the assent of the Mexican Government will be communicated to them in time to enable them to complete the Road before the setting in of the next winter -- If it should happen however that the consent of this Government cannot be obtaind and communicated to us here in July, then we can return to the boundary line and complete that part of the road which lies within the teritory of the U States -- I am still of opinion that the first appropriation will enable the commissioners to complete their work if they use proper econemy, and meet with no serious losses -- I have come to this conclusion upon a very fair estimate upon good data which supposes that we shall finish on or about the 20th of November -- If you can send an express to me on your approach to return to you before you enter the mountains it may possibly be in my power to suggest to you some arrangements by which considerable expence may be saved and some time and labour also -- should you deem it expedient to send an express direct it to me here - and if you need any refreshments let me know it and I will endeavour to supply them -- I shall be ready to set out homeward at a moments warning indeed I have already nearly completed every necessary preperation for the journey (as far as I can before your arrival) which I am extremely anxious to commence\nHopeing soon to see you in good health & to greet you with full powers to enable us to progress with the Road to its completion without further delay.\nI remain with great respect\nyr obdt servt\nG. C Sibley\nPS.\nShould you send an express, I will thank you to forward by him any letters &c that you or any of the company with you may have in charge for Mr Brown and myself\nYrs\nG.C.S.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>24</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57996"><img src="https://digital.newberry.org/transcribe/omeka/files/original/b034514ea0673fe15de651737c1d0089.jpg" /></a></td>
    <td className="transcription">{`Copy of a letter from Mr Poinsett to G C Sibley \ndated Legation of the U.S. Mexico 31 Decr 1825 Received\nat Santa Fee 26th February 1826\nG.C Sibley esqr.\nSir\nI have this Instant received your Letter of the 12th ulto, and as the communication between the capital and New Mexico is not very frequent, hasten to reply to it by the carrier which leaves this to night.\nI have hitherto failed to induce the President of these states to take any part in the survey of the proposed road, untill after we shall have concluded our treaty of limits -- as there has been lately a change in the administration I have again renewd the negociation and will inform you of the result by the earliest opportunity -- your account of the route is highly satisfactory and will, I hope, aid me to bring this affair to a favourable conclusion --\nI have the honor to be with \ngreat respect sir yr obdt servt\n(signed) J. R Poinsett\nExtract from G C Sibleys answer to the above dated Santa Fee New Mexico 5th March 1826\nThe delay on the part of the Mexican Government in yielding its assent to the survey and marking the western section of the proposed road from the Missouri to this frontier, is a circumstance that was entirely unlooked for by the commissioners. To me it appears the more extraordinary`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>25</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57997"><img src="https://digital.newberry.org/transcribe/omeka/files/original/8881efe2ec4e2596b0bcabc8f2b4b2af.jpg" /></a></td>
    <td className="transcription">{`as our Government does not ask of the Mexican Government any participation in the expence, and I am confident that the Road when completed, will be infinitely more advantageous to this country than to the western parts of the United States --\nUnless the consent of the Mexican Government is obtaind in season, to reach my colleagues in Missouri via the City of Washington, early in May I should be very apprehensive that they may decline comeing to join me here in June agreeable to our arrangement; that the completion of the Road will be obliged to be deferd another season, and which will be worse, we shall have incured a heavy expence unnecessarily, in consequence of our reliance upon the ready assent of this Government to permit the U. States to open the Road at our own expence--\nIf this assent can be had and communicated to me here by the 20th of June, or even by the 15th of July I might perhaps be able to obviate the most of the above difficulties & finish the Road by the setting in of winter, whether my colleagues join me here or not --\nI enclose you a copy of a communication that I made to the Governor of New Mxo on the 5th of January, possibly you may find it of some use --\nI have the honor &c\n(signed) G. C Sibley\nHis Excellency\nJ. R. Poinsett\nMinister of the U. S\nMexico`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>26</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57998"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7a26081a1673237fa9fca078c4550c60.jpg" /></a></td>
    <td className="transcription">{`St. Louis 30th Octr 1826\nDr Sir\nMr. Sibley & his party have at length returned, I understand he has written to you. I came by Col. Reeves's as I came down & he informed me that Mr Sibley had written to him requesting a meeting of the commissioners at St. Louis as soon as practicable, bu the stated that he & you had met & concluded it would not be advisable to make return this winter. I believe Mr. Sibley thinks otherwise -- Col. Reeves thinks the government will probably make appropriation to have a treaty made with the tribes of Indians beyond the Arkansas & that it is greatly desirable to have such treaty. Mr. Sibley when at Sta. Fee thought it desirable to have such treaty but at present under existing circumstances I dont know what he thinks -- Col. Reeves says his opinion has undergone no change since he saw you & he requested me to say so to you in a letter stating he had no time to write -- I am ? the direction of Mr. Sibley & Col. Reeves making`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>27</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/57999"><img src="https://digital.newberry.org/transcribe/omeka/files/original/eba0d98afcf92a805f4ef61ed6418dfe.jpg" /></a></td>
    <td className="transcription">{`in these enterprises among those whose ready sympathy was ever alert in all that promised benefit to the cause of philanthropy Rev Edward Beecher was made the first President of the College and Col Mather a member of the Board of Trustees in which capacity as well as by liberal contributions he fostered and encouraged the growth of the institution Miss Catherine Beecher came to Illinois in behalf of Monticello Seminary and the powerful influence of that eminent and cultivated family was exacted in the interest of the Seminary as well as the College They were the frequent guests of the Mathers and in`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>28</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58000"><img src="https://digital.newberry.org/transcribe/omeka/files/original/447ddf297b69be0a888452548e37ab45.jpg" /></a></td>
    <td className="transcription">{`cooperation with Miss Beecher in behalf of the cause of education Mrs Mather was made President of first society of ladies formed in Illinois for its promotion But their active benevolence and public spirit was not confined to any one line of effort but extended to all having for their object the well being of society and the alleviation of human suffering among these were the institutions known as public charities. Those acquainted with the early history of these enterprises will remember that the asylum for the insane first`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>29</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58001"><img src="https://digital.newberry.org/transcribe/omeka/files/original/1dfd9b2a9f9130b901c6d40185c9189f.jpg" /></a></td>
    <td className="transcription">{`inaugurated and established at Jacksonville owes its existence mainly to the personal endeavours of the eminent philanthropist Miss Dorothea L Dix who visited the seat of government in order to impress upon the legislature the urgent necessity for the establishment of such an institution and secure the proper legislation therefor Here during the Session she was the guest of Col Mathers family who entered heartily and with enthusiasm into the support of the measure using their personal influence with the members and citizens generally in its behalf`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>30</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58002"><img src="https://digital.newberry.org/transcribe/omeka/files/original/3b25d070e4277f62c357ec3b3af1e9c3.jpg" /></a></td>
    <td className="transcription">{`and thereby contributing very largely to its success. Col Mathers name is intimately associated with most of the leading enterprises of his day having for their object the development of the resources and the natural prosperity of his adopted state -- among these are the several Railroads known as the Galena and Chicago Union now a part of the great system of the North Western also the Great Western now a part of the Toledo Wabash and Western in both of which he and his friends had a`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>31</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58003"><img src="https://digital.newberry.org/transcribe/omeka/files/original/8bb7837949664fb72497faf9cabf3b07.jpg" /></a></td>
    <td className="transcription">{`five maps & as many copies of field notes to be ready when you chose to make returns. Mr. Sibley wishes the meeting to be at St. Louis in about ten days (where the secretary is as well as for other reasons) Col. Reeves wishes it to be at Jefferson (if it must be at all) & not until about the first decr --\nThe above is as near as I can understand the desires of the two comrs -- I merely in great haste give the facts without their reasons for their wishes -- with much esteem\nYrs\nJos. C Brown\nCol. Th. Mather`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>32</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58004"><img src="https://digital.newberry.org/transcribe/omeka/files/original/4537481d63c1d625cf3ae8e393e01e30.jpg" /></a></td>
    <td className="transcription">{`St Louis Mo\nNov 30.\nCol. Thos. Mather\nCaskaskia\nIillinois`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>33</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58005"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ff602d81120981fdf8d8e0a310e91b63.jpg" /></a></td>
    <td className="transcription">{`Fayette Mo. Nov 5 1826\nTo Thomas Mather Esqr\nU. S. Commisr &c.\nSir\nIn a former communication to you I mentiond the arrival of Mr Sibley, at Ft Osage, & that he expressd an opinion that the Comrs. of the Mexican Road should have an early meeting. Since which time I have recd a letter from him proposeing a meeting to take place on the 22d Inst at the City of St Louis to which I have replied by \"begging leave to convene the board of commissioners on Monday the 4th day of December next at the City of Jefferson, the present seat of Government for this state\" at which time and place I hope it will suit your convenience to attend. Mr Brown, our surveyor will necessarily have to attend there at that time in discharge of his senatorial duties. In fact the general assembly of this state will convene on the 20th Inst.\nI have the honour to be with \ngreat consideration\nYr mo obdt servt\nB H Reeves`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>34</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58006"><img src="https://digital.newberry.org/transcribe/omeka/files/original/ba2ff533c69ec2c416ab5958055dbe36.jpg" /></a></td>
    <td className="transcription">{`P.S Altho, I have named Jefferson City as the place of our meeting in preference to St Louis I hope in this Instance Jefferson will not meet with your disapprobation, especially so as the continued indisposition of my family renders it every way unpleasant for me to be absent from home longer than my public duties imperiously require, which little act of courtesy (as to the place of our meeting) I am well assured you will with cheerfulness extend towards me \nI felt & still feel desireous not to depart from the agreement we last enterd into relative to our takeing a review of our work before we make our final report -- but Mr S. seems so desireous that the comrs should meet, that I can no longer oppose that meeting, at which time we can either adhere or enter into whatever conclusions that may be most conclusive to the public trust committed to us. I have recd no letter from you since I saw you but have anxiously wished for one\nYrs most sincerely\nB. H. Reeves\nTh. Mather esqr.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>35</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58007"><img src="https://digital.newberry.org/transcribe/omeka/files/original/24beebd69825d4a73c6d6228e142f940.jpg" /></a></td>
    <td className="transcription">{`Fayette Mo. Nov 19 1826\nDr Col.\nIn my letter of the -- Inst I mentioned the convention of the Board of the Mexn. road Comrs on the 4th proximo in Jefferson. Since which time & before I had forwarded a similar note to Majr Sibley I recd a letter from Mr Sibley mentioning his acquiescence as to that place at my urgent request & mentiond that he would be at my house on his way to St Louis & that when he arrived we would agree upon the day & he would communicate to you & that`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>36</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58008"><img src="https://digital.newberry.org/transcribe/omeka/files/original/c2f58928baada051e7a5f1dd93f235b5.jpg" /></a></td>
    <td className="transcription">{`he expected you would accompany him to Jefferson & in the mean time Mr S. requested me to write on & engage suitable lodgings &c which I have done\nI did not agree to this meeting with a view of departing from that course you & I agreed upon when last together & so I expressed myself to Mr S. But merely at his request so that we might conjointly come to some determination\nI did hope to have recd ere this an answer to mine to you immediately after Mr Sibleys arrival -- my not haveing heard from you induces me to believe that perhaps you may`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>37</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58009"><img src="https://digital.newberry.org/transcribe/omeka/files/original/614185bd128babc8ef9c84d1e1494626.jpg" /></a></td>
    <td className="transcription">{`be to the Eastward & if so I hope Mrs Mather will communicate this fact to me\nWith Much esteem\nYrs sincerely\nB. H. Reeves\nThomas Mather Esqr.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>38</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58010"><img src="https://digital.newberry.org/transcribe/omeka/files/original/2496f63ba4704a4e44c2cc8dc5e80dab.jpg" /></a></td>
    <td className="transcription">{`Thomas Mather Esqr\nU. S Commissioner &c\nKaskaskia\nIllinoise`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>39</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58011"><img src="https://digital.newberry.org/transcribe/omeka/files/original/9a93182d5050d131dd5975db73d595a1.jpg" /></a></td>
    <td className="transcription">{`Ft Osage May 10th 1827\nD. Sir,\nBeing just about to set out, in a few days, upon my road marking Trip to the Prairies, and presuming you would like to know something further in relation to this movement, I avail myself of a moments quiet this am? (in the midst of the bustle of my men &c?) to afford you that information -- Col. Reeves has declined going altogether, in consequence of the continued illness of his wife, which obliges him to take a trip to Kentucky with her, upon which he will probably start about the 20th of this month.\nKnowing your disinclination to the Trip, and being satisfied myself of the entire uselessness of more than one of us going, I made up my mind to do this work without Col. Reeves, as he appeared very anxious to be exempted on account of the sickness of Mrs. R.--\nI have engaged 12 Hands to accompany me, and expect to be under way before the`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>40</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58012"><img src="https://digital.newberry.org/transcribe/omeka/files/original/6931cebffbedb97c44906537f1d44bd9.jpg" /></a></td>
    <td className="transcription">{`the 20th Inst. -- In some particulars the expense of this Trip will exceed, & in others fall short of, the estimate we made last winter at St Louis -- The cost of the Hands will be greater - 1. in respect of the wages given & 2d. in the time they will be employed -- Having no saddles & bridles, & finding it difficult to procure any here, I have engaged each man to find his own for the Trip, & if he finds such as will hurt his mule, I am to allow $20 pr month wages instead of $16, which was the Price first agree on -- Some of the men will probably be in service near 3 months, tho' I do not expect to be out from home myself quite two -- The expense is somewhat lessened by Col. Reeves declining to go.\nThe Property left at Franklins has been sold for much less than it cost, in fact it sold for a mere trifle -- And upon the whole view of the matter I am now just as I am nearly prepared to start, and cannot withdraw on account of my engagements & purchases &c, surprised to discover that in all human? probability, the fund will fall short several Hundred Dollars -- I really fear Sir that \"The Pumpkins? won't hold out\" and`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>41</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58013"><img src="https://digital.newberry.org/transcribe/omeka/files/original/a6fc4762deae7b1f9a9f3cbbdb0d3624.jpg" /></a></td>
    <td className="transcription">{`and if I had not advanced as far as I have, I should most unquestionably decline the trip altogether.\nBut I must proceed now, even if I do it at my own expense -- It would be so Dam'd ridiculous to break up now, having pledged myself to the men, (who have put themselves out of business & to some expense to go) and actually Pitched my Tents, and collected all my mules &c - sorry I am, but proceed I must, and proceed I certainly shall with all possible economy and expedition -- when I return you shall immediately hear from me, and I shall be anxious to wind up, report & wash my hands of this Road making business as speedily as may be practicable -- It is extremely inconvenient for me to leave home, rather than have gone earlier than I shall go, I would unhesitatingly have declined it altogether, but the consequences have been what they might -- with great respect, I am D. Sir\nYrs. very truly\nG. C. Sibley\nThos. Mather Esqr.`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>42</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58014"><img src="https://digital.newberry.org/transcribe/omeka/files/original/7b8761ff77d755c98db587509d8677f7.jpg" /></a></td>
    <td className="transcription">{`S. Charles 1st April 1828.\nDr Sir,\nI am somewhat disappointed on my return from Loui.a to learn from Tracy & Wahrendorf that they have heard nothing yet in relation to the balance due from the Govt. to the Mexn. Road Commrs., which you were to get adjusted at Washington and place to the order of T & W for my use -- as those Gentlemen are in advance to me upon that score, and appear to be in want of the money, I am extremely anxious that it may be placed at their disposal as quickly as possible -- Will you have the goodness to advise them as soon as you can conveniently after you receive this, how the matter stands? --\nI spent the winter quite agreeably with my family in Louisiana, and returned to St. Louis on the 10th of March -- We are waiting here for the Liberator to take us home, she will probably arrive here by the 15th -- I shall be at St. Louis a few days next week -- I hear nothing of our report; why is it not published? it surely ought to be -- Hope you will favour me with a Letter before long.\nyrs. very truly\nG.C. Sibley\nThos. Mather Esqr\nKaskaskia`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>43</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58015"><img src="https://digital.newberry.org/transcribe/omeka/files/original/78fa3e439136a221dcb84e4841a244b6.jpg" /></a></td>
    <td className="transcription">{`Free\n\nSt Charles Mo G. C. Sibley\nApl P.M. Ft Osage\nThomas Mather Esquire\n(care of Mr. Lamb, Mercht.)\nKaskaskia`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>44</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58016"><img src="https://digital.newberry.org/transcribe/omeka/files/original/e77a4d17809653885a3732024a0a0f63.jpg" /></a></td>
    <td className="transcription">{`[[This page consists of a sketch map, drawn on a grid, of portions of the Arkansas and Simaron [Cimarron] Rivers. The sketch is bordered by the notation \"U.S. Boundary line\" at one end and \"Rio Del Norte\" at the other. Various points of reference and coordinates are part of the sketch. A notation at the bottom reads: \"Latitude of unclear is 36-24-30 N.\" A detailed notation accompanies a point on the sketch locating Chouteau's Island and reads as follows: \"Chouteaus Isld. where we turn southd. may be known as a sort of mound like point on the north side of the river, the Island is full of small cotton wood & brush; also at the lower end of it is a thicket of brush & some trees on the south side of the river -- 2 miles or so to the sand hills from the river, a lone tree is to be to the right hand, it stands in a valley: passing south this valley leads through the sand hills about 5 miles -- when about 2 mi? in the hills leave some grown? trees? to the right the way is good if rightly followed which is easily done\"]]`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>45</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58017"><img src="https://digital.newberry.org/transcribe/omeka/files/original/6f264064130b0818872c9c073cc375fb.jpg" /></a></td>
    <td className="transcription">{`This page is blank`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>46</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58018"><img src="https://digital.newberry.org/transcribe/omeka/files/original/6acde80232e44aa5246d4162655fc1a0.jpg" /></a></td>
    <td className="transcription">{`Mrs Hannah Gibson Mather (the subject of this memoir) departed this life at Old Mission Michigan on the 18th of June 1886 having survived her husband and most of her brothers and sister more than a generation\nShe was born at Connellsville Pennsylvania on the 23d of March 1798 and was therefore at the time of her death upwards of Eighty eight years of age. She was the second daughter of George Lamb and Susanna Gibson who were members of the Society of \"Friends\" as were their ancestors before them for many generations\nAlthough Mrs Mather`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>47</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58019"><img src="https://digital.newberry.org/transcribe/omeka/files/original/37831028dac9a084b397d5b99cd8d1aa.jpg" /></a></td>
    <td className="transcription">{`felt a just pride in the ancestral name \"Gibson\" honored as it is in the ancient commonwealth whose annals it has illustrated she esteemed her birthright in a religious society as a higher honor than any worldly distinction and throughout life wore it as a crown humbly and reverently without ostentation yet with inflexible principle\nReared in the faith and practice of \"Friends\" in the serene hours of her childhood and youth her spirit and manner were informed and moulded by the subtle & gracious influence and traditions of her people and she was ever`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>48</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58020"><img src="https://digital.newberry.org/transcribe/omeka/files/original/26afe4c8efb8ca89ed7b2bf144e10d23.jpg" /></a></td>
    <td className="transcription">{`a lovely example of Christian meekness and humility united with dignity and firmness\nThe home of the Gibsons and Lambs at Connellsville must have been an excellent seminary for character in which the best and highest qualities were trained and developed Mrs Mathers mother was a woman of rare sweetness and strength of character and her life was rich in kindly offices and gracious ministries and like her daughter she kept in old age her quick and vivid interest in all that tended to promote the cause of her divine master The beautiful`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>49</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58021"><img src="https://digital.newberry.org/transcribe/omeka/files/original/1ce78c9e29a025accff13485b56a00cb.jpg" /></a></td>
    <td className="transcription">{`and noble characteristics of her daughters Mrs Roberts and Mrs Mather bear testimony to her possession of all womanly graces and virtues and although the tomb closed over her many years since her memory is still blessed and cherished by those who had the happiness to come within the radiance and warmth of her benign and holy spirit \nIn the year 1819 - lined out 1920 the circle of the home at Connellsville was broken by the marriage of the elder daughter Susan to Mr Edmund Roberts a native of New Hampshire and at that time a prosperous merchant at Kaskaskia`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>50</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58022"><img src="https://digital.newberry.org/transcribe/omeka/files/original/f1072a07c4db39deb2de117c9794c457.jpg" /></a></td>
    <td className="transcription">{`Illinois, to that distant old French village the new seat of government of the state which only the previous year 1918 had been admitted into the Union Mrs Roberts went to make a new home among entire strangers, shortly after her brother Mr James L. Lamb then residing in Cincinnatti and unmarried followed forming a business connection with Mr Roberts and in 1823 the mother and sister were added to the family and later the remaining brothers came also`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>51</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58023"><img src="https://digital.newberry.org/transcribe/omeka/files/original/6beefa35ba3e8a76dfd23ec483ffcb84.jpg" /></a></td>
    <td className="transcription">{`The Society of Friends had then no meeting in Illinois but the family deeply imbued with the spirit of the divine master and ever ready to welcome his disciples of whatever name made a nucleus around which all that was excellent in the moral and religious life of the young community and state gathered with sympathetic interest Here the early pioneers of the cross of whatever denomination met with like fraternal greeting and ever hospitable reception -- under their auspices the first Sunday school was organized of which the venerable`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>52</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58024"><img src="https://digital.newberry.org/transcribe/omeka/files/original/3a486903fe8674a95b8e572d0a2273bb.jpg" /></a></td>
    <td className="transcription">{`mother became a teacher and patron and it is not overstating the fact to say that after the advent of this family and mainly through its example and influence the character of the society of Kaskaskia took on a different and less exclusively worldly aspect It was during their residence here in the year 1825 that (the ^younger daughter^ subject of this memoir) was married to Col Thomas Mather a descendant of the long and illustrious line of New England divines whose sterling principles and virtues he inherited He had come to the state in 1818 and engaged in merchandising`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>53</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58025"><img src="https://digital.newberry.org/transcribe/omeka/files/original/0a217456d5a2cec660d9143085a93cc2.jpg" /></a></td>
    <td className="transcription">{`and was also employed in public affairs, shortly before his marriage he was commissioned by the President in connection with General Sibley and Mr Reeves to create a military road from Independence Missouri to Santa Fe New Mexico - which duty he honorably discharged. He was for many years a member of the general assembly of Illinois and at this time speaker of the House of Representatives but on the organization of the state bank in 1835 he resigned his seat as senator from the district composed of Randolph`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>54</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58026"><img src="https://digital.newberry.org/transcribe/omeka/files/original/3f00a47e15f969f069fa603596cc6d4b.jpg" /></a></td>
    <td className="transcription">{`and Perry counties and accepted the Presidency of the Bank in which office he continued during its existence removing to Springfield where the mother Bank was located In this relation he was most generally and widely known but his memory will ever be held in grateful reverence by posterity for the conspicuous part he bore in successfully resisting the scheme to call a convention to make Illinois a slave state that contest in the light of subsequent history was the most exciting and memorable in the annals of the state and drew upon Illinois the eyes`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>55</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58027"><img src="https://digital.newberry.org/transcribe/omeka/files/original/4a5a212afc3f62163bdbedc5c2af255a.jpg" /></a></td>
    <td className="transcription">{`of the nation enlisting as it did the ardent sympathies and vigorous pens of philanthropists east as well as west It was the first great battle between the friends and opponents of slavery upon the distinct issue whether a free state should by the solemn and affirmative act of the people be made slave\nIn alluding to the part taken by Col Mather in this controversy the Hon E B. Washburne late Secy of State of the U S and Minister to France says, \"Col Mather in my judgment was the leader of the anti convention forces in`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>56</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58028"><img src="https://digital.newberry.org/transcribe/omeka/files/original/df9767bcd15fc01b380951ded9787297.jpg" /></a></td>
    <td className="transcription">{`the legislation of 1822-3 as he was one of the most active and efficient opponents of the measure before the people He was a good true and able man and died without a spot on his escutcheon\"\nCol Mather brought from New England his love of its peculiar institutions He fully realized that intelligence and virtue are the main pillars in the political and social edifice and accordingly the church and the school found in him a liberal and active patron His benefactions to the church were frequent and large. He gave systematically`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr><tr>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927">Thomas Mather letters, 1825-1886</a></td>
    <td>57</td>
    <td><a href="https://publications.newberry.org/transcribe/#/item/927/page/58029"><img src="https://digital.newberry.org/transcribe/omeka/files/original/d2cffcf5ec1a7dbf0ffcc3d08fa90597.jpg" /></a></td>
    <td className="transcription">{`and judiciously and these were by no means confined to that communion in which he was reared and habitually worshipped among the earliest institutions of learning established in the then young state were Illinois College and Monticello Seminary These foundations were laid under the auspices of the Congregational Society whose active agents in the premises were Revs Ellis--Jenny the Beechers and kindred spirits -- Mr Ellis had married in Kaskaskia the intimate personal friend of Mrs Mather and they very naturally sought counsel and support`.split('\n').map(str => <p>{str}</p>)}</td>
    </tr>
  </table>
  // let toCsv = data.map(d => d.toString() + "\n")
  return (
    <div className="App">
      <main className="App-header">
        {/* {JSON.stringify(data)} */}
        {dataTable}
      </main>
    </div>
  );
}

export default App;
