import{Ka as s,bb as n,cb as e,pb as t,qb as a,rb as m,sb as d,tb as l,ub as r,za as i}from"./chunk-DTWOPLIO.js";var p=class E{static \u0275fac=function(o){return new(o||E)};static \u0275cmp=s({type:E,selectors:[["app-inlay-hints-demo"]],decls:864,vars:63,consts:[[1,"demo-page"],[1,"demo-header"],[1,"badge"],[1,"badge","test-badge"],[1,"demo-description"],[1,"example-section","config-section"],[1,"desc"],[1,"code-block","wide"],[1,"hl-comment"],[1,"example-section"],[1,"hint-grid"],[1,"hint-example"],[1,"hint-label"],[1,"code-block"],[1,"hl-var"],[1,"hl-hint"],[1,"config-tag"],[1,"test-ref"],[1,"hl-dim"],[1,"hl-event"],[1,"hl-good"],[2,"margin-top","16px"],[1,"example-section","highlight-section"],[1,"hint-example","legacy-example"],[1,"hl-warn"],[1,"hint-example","native-example"],[1,"note-box"]],template:function(o,c){o&1&&(n(0,"div",0)(1,"div",1)(2,"h2"),t(3,"Angular-Specific Inlay Hints"),e(),n(4,"span",2),t(5,"LSP 3.17"),e(),n(6,"span",3),t(7,"118 Test Cases"),e()(),n(8,"p",4),t(9," Rich, configurable inlay hints for Angular templates \u2014 showing types for control flow variables, event parameters, pipe outputs, input bindings, host bindings, and more. Fully aligned with TypeScript's inlay hints configuration. All examples below are derived from the actual spec ("),n(10,"code"),t(11,"inlay_hints_spec.ts"),e(),t(12,") with 118 test scenarios. "),e(),n(13,"section",5)(14,"h3"),t(15,"Complete Configuration Reference"),e(),n(16,"p",6),t(17," All options configurable via VS Code settings or Angular language service plugin config. Options mirror TypeScript's where applicable. "),e(),n(18,"div",7)(19,"pre"),t(20),n(21,"span",8),t(22,"// Variable Type Hints"),e(),t(23,`
  "angular.inlayHints.forLoopVariableTypes": true,
  "angular.inlayHints.ifAliasTypes": "complex",
  "angular.inlayHints.letDeclarationTypes": true,
  "angular.inlayHints.referenceVariableTypes": true,
  "angular.inlayHints.switchExpressionTypes": true,
  "angular.inlayHints.deferTriggerTypes": true,

  `),n(24,"span",8),t(25,"// Event Parameter Hints"),e(),t(26,`
  "angular.inlayHints.eventParameterTypes": true,
  "angular.inlayHints.hostListenerArgumentTypes": true,

  `),n(27,"span",8),t(28,"// Property Binding Hints"),e(),t(29,`
  "angular.inlayHints.propertyBindingTypes": true,
  "angular.inlayHints.requiredInputIndicator": "none",

  `),n(30,"span",8),t(31,"// Pipe Hints"),e(),t(32,`
  "angular.inlayHints.pipeOutputTypes": true,

  `),n(33,"span",8),t(34,"// Parameter Name Hints"),e(),t(35,`
  "angular.inlayHints.parameterNameHints": "all",
  "angular.inlayHints.parameterNameHintsWhenArgumentMatchesName": false,

  `),n(36,"span",8),t(37,"// Arrow Function Hints"),e(),t(38,`
  "angular.inlayHints.arrowFunctionParameterTypes": true,
  "angular.inlayHints.arrowFunctionReturnTypes": true,

  `),n(39,"span",8),t(40,"// Behavior Modifiers"),e(),t(41),e()()(),n(42,"section",9)(43,"h3"),t(44,"1. Variable Type Hints"),e(),n(45,"p",6),t(46," Inline type annotations for template-declared variables. Covers @for, @if, @let, template refs, @switch, @defer, ng-template, and legacy structural directives. "),e(),n(47,"div",10)(48,"div",11)(49,"div",12),t(50,"@for loop variable"),e(),n(51,"div",13)(52,"pre"),t(53,"@for ("),n(54,"span",14),t(55,"user"),e(),n(56,"span",15),t(57,": User"),e(),t(58),e()(),n(59,"div",16),t(60,"forLoopVariableTypes: true"),e(),n(61,"div",17),t(62,"Spec #1"),e()(),n(63,"div",11)(64,"div",12),t(65,"@for context variables"),e(),n(66,"div",13)(67,"pre"),t(68,"@for ("),n(69,"span",14),t(70,"item"),e(),n(71,"span",15),t(72,": string"),e(),t(73,` of items; track $index;
  let `),n(74,"span",14),t(75,"i"),e(),n(76,"span",15),t(77,": number"),e(),t(78,` = $index,
      `),n(79,"span",14),t(80,"c"),e(),n(81,"span",15),t(82,": number"),e(),t(83,` = $count,
      `),n(84,"span",14),t(85,"f"),e(),n(86,"span",15),t(87,": boolean"),e(),t(88,` = $first,
      `),n(89,"span",14),t(90,"l"),e(),n(91,"span",15),t(92,": boolean"),e(),t(93," = $last)"),e()(),n(94,"div",16),t(95,"forLoopVariableTypes: true"),e(),n(96,"div",17),t(97,"Spec #2, #113 \u2014 no duplicate hints"),e()(),n(98,"div",11)(99,"div",12),t(100,"@if alias (simple)"),e(),n(101,"div",13)(102,"pre"),t(103,"@if (currentUser; as "),n(104,"span",14),t(105,"u"),e(),n(106,"span",15),t(107,": User"),e(),t(108),e()(),n(109,"div",16),t(110,"ifAliasTypes: true"),e(),n(111,"div",17),t(112,"Spec #3 \u2014 type narrowing applied"),e()(),n(113,"div",11)(114,"div",12),t(115,"@if alias (complex mode)"),e(),n(116,"div",13)(117,"pre")(118,"span",8),t(119,"// ifAliasTypes: 'complex' \u2014 hides simple reads"),e(),t(120,`
@if (currentUser; as u)     `),n(121,"span",18),t(122,"// NO hint (simple)"),e(),t(123,`
@if (user?.name; as `),n(124,"span",14),t(125,"n"),e(),n(126,"span",15),t(127,": string"),e(),t(128,`)
@if (items.length > 0; as `),n(129,"span",14),t(130,"ok"),e(),n(131,"span",15),t(132,": boolean"),e(),t(133,")"),e()(),n(134,"div",16),t(135,"ifAliasTypes: 'complex'"),e(),n(136,"div",17),t(137,"Spec #79-81 \u2014 smart filtering"),e()(),n(138,"div",11)(139,"div",12),t(140,"@let declarations"),e(),n(141,"div",13)(142,"pre"),t(143,"@let "),n(144,"span",14),t(145,"count"),e(),n(146,"span",15),t(147,": number"),e(),t(148,` = items.length;
@let `),n(149,"span",14),t(150,"doubled"),e(),n(151,"span",15),t(152,": number"),e(),t(153," = count * 2;"),e()(),n(154,"div",16),t(155,"letDeclarationTypes: true"),e(),n(156,"div",17),t(157,"Spec #5"),e()(),n(158,"div",11)(159,"div",12),t(160,"Template references"),e(),n(161,"div",13)(162,"pre"),t(163,"<input "),n(164,"span",14),t(165,"#nameInput"),e(),n(166,"span",15),t(167,": HTMLInputElement"),e(),t(168,` />
<div tooltip `),n(169,"span",14),t(170,"#tip"),e(),n(171,"span",15),t(172,": TooltipDirective"),e(),t(173,'="tooltip">'),e()(),n(174,"div",16),t(175,"referenceVariableTypes: true"),e(),n(176,"div",17),t(177,"Spec #13-14"),e()(),n(178,"div",11)(179,"div",12),t(180,"@switch expressions"),e(),n(181,"div",13)(182,"pre"),t(183,"@switch ("),n(184,"span",14),t(185,"status"),e(),n(186,"span",15),t(187,": Status"),e(),t(188),n(189,"span",14),t(190,"user?.id"),e(),n(191,"span",15),t(192,": number | undefined"),e(),t(193),e()(),n(194,"div",16),t(195,"switchExpressionTypes: true"),e(),n(196,"div",17),t(197,"Spec #43-46"),e()(),n(198,"div",11)(199,"div",12),t(200,"@defer trigger & ng-template"),e(),n(201,"div",13)(202,"pre"),t(203,"@defer (when "),n(204,"span",14),t(205,"isVisible"),e(),n(206,"span",15),t(207,": boolean"),e(),t(208),n(209,"span",14),t(210,"user"),e(),n(211,"span",15),t(212,": User"),e(),t(213,`
  let-`),n(214,"span",14),t(215,"extra"),e(),n(216,"span",15),t(217,": string"),e(),t(218,'="extra">'),e()(),n(219,"div",17),t(220,"Spec #47-49"),e()(),n(221,"div",11)(222,"div",12),t(223,"*ngFor / *ngIf (legacy)"),e(),n(224,"div",13)(225,"pre"),t(226,'<li *ngFor="let '),n(227,"span",14),t(228,"item"),e(),n(229,"span",15),t(230,": string"),e(),t(231,` of items;
  let `),n(232,"span",14),t(233,"idx"),e(),n(234,"span",15),t(235,": number"),e(),t(236,` = index">
<div *ngIf="data as `),n(237,"span",14),t(238,"result"),e(),n(239,"span",15),t(240,": Data"),e(),t(241,'">'),e()(),n(242,"div",17),t(243,"Spec #15, #50"),e()(),n(244,"div",11)(245,"div",12),t(246,"@if fine-grained & @else if"),e(),n(247,"div",13)(248,"pre"),t(249),n(250,"span",14),t(251,"a"),e(),n(252,"span",15),t(253,": string"),e(),t(254),n(255,"span",14),t(256,"b"),e(),n(257,"span",15),t(258,": number"),e(),t(259),e()(),n(260,"div",17),t(261,"Spec #4, #82"),e()()()(),n(262,"section",9)(263,"h3"),t(264,"2. Event Parameter Type Hints"),e(),n(265,"p",6),t(266," Shows the inferred type of "),n(267,"code"),t(268,"$event"),e(),t(269,". Configurable per source: native DOM events, component outputs, animation events. 16 tested DOM event types. "),e(),n(270,"div",10)(271,"div",11)(272,"div",12),t(273,"Native DOM events"),e(),n(274,"div",13)(275,"pre"),t(276,"<button ("),n(277,"span",19),t(278,"click"),e(),n(279,"span",15),t(280,": MouseEvent"),e(),t(281,`)="onClick($event)">
<input (`),n(282,"span",19),t(283,"keydown"),e(),n(284,"span",15),t(285,": KeyboardEvent"),e(),t(286,`)="onKey($event)">
<input (`),n(287,"span",19),t(288,"keydown.enter"),e(),n(289,"span",15),t(290,": KeyboardEvent"),e(),t(291,`)="enter()">
<input (`),n(292,"span",19),t(293,"focus"),e(),n(294,"span",15),t(295,": FocusEvent"),e(),t(296,`)="onFocus($event)">
<input (`),n(297,"span",19),t(298,"input"),e(),n(299,"span",15),t(300,": Event"),e(),t(301,`)="onInput($event)">
<div (`),n(302,"span",19),t(303,"dragover"),e(),n(304,"span",15),t(305,": DragEvent"),e(),t(306,')="onDrag($event)">'),e()(),n(307,"div",16),t(308,"eventParameterTypes: true"),e(),n(309,"div",17),t(310,"Spec #70-77"),e()(),n(311,"div",11)(312,"div",12),t(313,"Component output / model()"),e(),n(314,"div",13)(315,"pre")(316,"span",8),t(317,"// EventEmitter<string>"),e(),t(318,`
<app (`),n(319,"span",19),t(320,"queryChange"),e(),n(321,"span",15),t(322,": string"),e(),t(323,`)="onSearch($event)">
`),n(324,"span",8),t(325,"// output<number>()"),e(),t(326,`
<app (`),n(327,"span",19),t(328,"changed"),e(),n(329,"span",15),t(330,": number"),e(),t(331,`)="onChange($event)">
`),n(332,"span",8),t(333,"// model() change"),e(),t(334,`
<app ((`),n(335,"span",19),t(336,"valueChange"),e(),n(337,"span",15),t(338,": string"),e(),t(339,'))="val = $event">'),e()(),n(340,"div",17),t(341,"Spec #52-54"),e()(),n(342,"div",11)(343,"div",12),t(344,"Animation events"),e(),n(345,"div",13)(346,"pre"),t(347,`<div [@anim]="state"
  (@anim.done`),n(348,"span",15),t(349,": AnimationEvent"),e(),t(350,`)="onDone($event)"
  (@anim.start`),n(351,"span",15),t(352,": AnimationEvent"),e(),t(353,')="onStart($event)">'),e()(),n(354,"div",17),t(355,"Spec #55"),e()(),n(356,"div",11)(357,"div",12),t(358,"Fine-grained event config"),e(),n(359,"div",13)(360,"pre"),t(361),e()(),n(362,"div",17),t(363,"Spec #68-69"),e()()()(),n(364,"section",9)(365,"h3"),t(366,"3. Host Binding & @HostListener Hints"),e(),n(367,"p",6),t(368," Hints work in host bindings and @HostListener decorators \u2014 $event property access, window/document events, keyboard modifiers, method calls, arithmetic expressions. "),n(369,"strong"),t(370,"15 distinct test cases."),e()(),n(371,"div",10)(372,"div",11)(373,"div",12),t(374,"@HostListener $event properties"),e(),n(375,"div",13)(376,"pre"),t(377,`@HostListener('click', [
  '`),n(378,"span",14),t(379,"$event.target"),e(),n(380,"span",15),t(381,": EventTarget"),e(),t(382,`',
  '`),n(383,"span",14),t(384,"$event.clientX"),e(),n(385,"span",15),t(386,": number"),e(),t(387,`',
  '`),n(388,"span",14),t(389,"$event.clientY"),e(),n(390,"span",15),t(391,": number"),e(),t(392,`'
])`),e()(),n(393,"div",17),t(394,"Spec #18, #41"),e()(),n(395,"div",11)(396,"div",12),t(397,"Window/Document events"),e(),n(398,"div",13)(399,"pre"),t(400,"@HostListener('"),n(401,"span",19),t(402,"window:resize"),e(),t(403,`',
  ['$event.target.innerWidth'])
@HostListener('`),n(404,"span",19),t(405,"document:keydown"),e(),t(406,`',
  ['$event.key', '$event.ctrlKey'])
@HostListener('click',
  ['$event.target`),n(407,"span",19),t(408,"?."),e(),t(409,"nodeName'])"),e()(),n(410,"div",17),t(411,"Spec #22-24"),e()(),n(412,"div",11)(413,"div",12),t(414,"Host metadata (mixed)"),e(),n(415,"div",13)(416,"pre"),t(417),n(418,"span",19),t(419,"click"),e(),t(420,`)': 'onClick($event)',
  '(`),n(421,"span",19),t(422,"keydown.enter"),e(),t(423,`)': 'onEnter($event)',
  '(`),n(424,"span",19),t(425,"keydown.shift.enter"),e(),t(426),e()(),n(427,"div",17),t(428,"Spec #35-42"),e()(),n(429,"div",11)(430,"div",12),t(431,"@HostBinding types & animation"),e(),n(432,"div",13)(433,"pre"),t(434),e()(),n(435,"div",17),t(436,"Spec #30-35, #42"),e()()()(),n(437,"section",9)(438,"h3"),t(439,"4. Pipe Output & Parameter Hints"),e(),n(440,"div",10)(441,"div",11)(442,"div",12),t(443,"Return type & parameter names"),e(),n(444,"div",13)(445,"pre"),t(446),n(447,"span",15),t(448,": string"),e(),t(449),n(450,"span",15),t(451,": Data | null"),e(),t(452),n(453,"span",15),t(454,"prefix:"),e(),t(455," '[' : "),n(456,"span",15),t(457,"suffix:"),e(),t(458," ']'"),n(459,"span",15),t(460,": string"),e(),t(461),n(462,"span",15),t(463,"format:"),e(),t(464," 'short'"),n(465,"span",15),t(466,": string | null"),e(),t(467),e()(),n(468,"div",17),t(469,"Spec #8-12"),e()(),n(470,"div",11)(471,"div",12),t(472,"Overloaded & chained"),e(),n(473,"div",13)(474,"pre")(475,"span",8),t(476,"// Overloaded: resolves by input type"),e(),t(477),n(478,"span",15),t(479,": string | null"),e(),t(480),n(481,"span",8),t(482,"// Chained: each gets own type hint"),e(),t(483),n(484,"span",15),t(485,": string"),e(),t(486,`
  | suffix : ']'`),n(487,"span",15),t(488,": string"),e(),t(489),e()(),n(490,"div",17),t(491,"Spec #11, #105"),e()()()(),n(492,"section",9)(493,"h3"),t(494,"5. Property Binding & Input Hints"),e(),n(495,"div",10)(496,"div",11)(497,"div",12),t(498,"Input types & required indicators"),e(),n(499,"div",13)(500,"pre"),t(501,"<div ["),n(502,"span",14),t(503,"user"),e(),n(504,"span",15),t(505,": User"),e(),t(506,`]="currentUser">
`),n(507,"span",8),t(508,"// requiredInputIndicator: 'asterisk'"),e(),t(509,`
<app [`),n(510,"span",14),t(511,"config"),e(),n(512,"span",15),t(513,": FormConfig*"),e(),t(514,`]="cfg">
`),n(515,"span",8),t(516,"// requiredInputIndicator: 'exclamation'"),e(),t(517,`
<app [`),n(518,"span",14),t(519,"config"),e(),n(520,"span",15),t(521,": FormConfig!"),e(),t(522,']="cfg">'),e()(),n(523,"div",17),t(524,"Spec #51, #86-89"),e()(),n(525,"div",11)(526,"div",12),t(527,"Text attrs & fine-grained config"),e(),n(528,"div",13)(529,"pre"),t(530,`<div textInput
  `),n(531,"span",14),t(532,"text"),e(),n(533,"span",15),t(534,": string!"),e(),t(535,`="hello">
`),n(536,"span",8),t(537,"// NOT shown for regular HTML attrs"),e(),t(538),e()(),n(539,"div",17),t(540,"Spec #84-85, #90-92"),e()()()(),n(541,"section",9)(542,"h3"),t(543,"6. Parameter Name Hints"),e(),n(544,"div",10)(545,"div",11)(546,"div",12),t(547,"All mode & literals only"),e(),n(548,"div",13)(549,"pre"),t(550,'(click)="moveTo('),n(551,"span",15),t(552,"x:"),e(),t(553," 100, "),n(554,"span",15),t(555,"y:"),e(),t(556,` 200)"

`),n(557,"span",8),t(558,"// 'literals' mode: only for non-variable args"),e(),t(559),n(560,"span",15),t(561,"num:"),e(),t(562),n(563,"span",15),t(564,"msg:"),e(),t(565,' `hello`)"\n(click)="setItems('),n(566,"span",15),t(567,"items:"),e(),t(568,' [1,2,3])"'),e()(),n(569,"div",17),t(570,"Spec #58, #60, #95-99"),e()(),n(571,"div",11)(572,"div",12),t(573,"Rest params & overloads"),e(),n(574,"div",13)(575,"pre"),t(576,'(click)="log('),n(577,"span",15),t(578,"prefix:"),e(),t(579,` 'msg',
  `),n(580,"span",15),t(581,"...items:"),e(),t(582,` 'a', 'b', 'c')"

`),n(583,"span",8),t(584,"// Suppressed when arg matches param name:"),e(),t(585,`
(click)="handleClick(event)" `),n(586,"span",18),t(587,"// NO hint"),e(),t(588),n(589,"span",15),t(590,"value:"),e(),t(591," 'hello', "),n(592,"span",15),t(593,"count:"),e(),t(594),e()(),n(595,"div",17),t(596,"Spec #61-64, #101-102"),e()()()(),n(597,"section",9)(598,"h3"),t(599,"7. Arrow Functions, Generics & Edge Cases"),e(),n(600,"div",10)(601,"div",11)(602,"div",12),t(603,"Arrow function types"),e(),n(604,"div",13)(605,"pre"),t(606),n(607,"span",14),t(608,"item"),e(),n(609,"span",15),t(610,": Item"),e(),t(611),n(612,"span",15),t(613,": number"),e(),t(614),e()(),n(615,"div",17),t(616,"Spec #93"),e()(),n(617,"div",11)(618,"div",12),t(619,"Generic inference"),e(),n(620,"div",13)(621,"pre"),t(622,"@let "),n(623,"span",14),t(624,"result"),e(),n(625,"span",15),t(626,": string"),e(),t(627,` = identity('hello');
@let `),n(628,"span",14),t(629,"box"),e(),n(630,"span",15),t(631,": Box<number>"),e(),t(632," = makeBox(123);"),e()(),n(633,"div",17),t(634,"Spec #107-108"),e()(),n(635,"div",11)(636,"div",12),t(637,"Type-matches-name suppression"),e(),n(638,"div",13)(639,"pre")(640,"span",8),t(641,"// variableTypeHintsWhenTypeMatchesName: false"),e(),t(642,`
@for (user of users; ...) `),n(643,"span",18),t(644,'// hide ": User"'),e(),t(645,`
@for (item of people; ...) `),n(646,"span",14),t(647,"item"),e(),n(648,"span",15),t(649,": Person"),e(),t(650,`
`),n(651,"span",8),t(652,"// Case-insensitive, generic-aware"),e()()(),n(653,"div",17),t(654,"Spec #56-57, #117-118"),e()(),n(655,"div",11)(656,"div",12),t(657,"Interactive & graceful fallback"),e(),n(658,"div",13)(659,"pre")(660,"span",8),t(661,"// interactiveInlayHints: true"),e(),t(662,`
`),n(663,"span",8),t(664,'// Click ": User" to navigate to definition'),e(),t(665,`

`),n(666,"span",8),t(667,"// No crash on:"),e(),t(668,`
(click)="doSomething()"  `),n(669,"span",8),t(670,"// 0 args"),e(),t(671,`
obj?.method?.(42)         `),n(672,"span",8),t(673,"// safe call"),e(),t(674),n(675,"span",8),t(676,"// no transform"),e()()(),n(677,"div",17),t(678,"Spec #103, #106, #111-115"),e()()()(),n(679,"section",9)(680,"h3"),t(681,"TypeScript vs Angular Inlay Hints"),e(),n(682,"p",6),t(683," Angular's inlay hints mirror TypeScript's configuration model but add template-specific hints that have no TS equivalent: "),e(),n(684,"div",10)(685,"div",11)(686,"div",12),t(687,"TypeScript Options \u2192 Angular Equivalents"),e(),n(688,"div",13)(689,"pre")(690,"span",8),t(691,"// TS: includeInlayVariableTypeHints"),e(),t(692,`
`),n(693,"span",19),t(694,"Angular: variableTypes"),e(),t(695," "),n(696,"span",20),t(697,"\u2713"),e(),t(698,`

`),n(699,"span",8),t(700,"// TS: includeInlayFunctionParameterTypeHints"),e(),t(701,`
`),n(702,"span",19),t(703,"Angular: eventParameterTypes"),e(),t(704," "),n(705,"span",20),t(706,"\u2713"),e(),t(707,`

`),n(708,"span",8),t(709,"// TS: includeInlayParameterNameHints"),e(),t(710,`
`),n(711,"span",19),t(712,"Angular: parameterNameHints"),e(),t(713," "),n(714,"span",20),t(715,"\u2713"),e(),t(716,`

`),n(717,"span",8),t(718,"// TS: includeInlayFunctionLikeReturnTypeHints"),e(),t(719,`
`),n(720,"span",19),t(721,"Angular: pipeReturnTypes"),e(),t(722," "),n(723,"span",20),t(724,"\u2713"),e()()()(),n(725,"div",11)(726,"div",12),t(727,"Angular-Only (No TS Equivalent)"),e(),n(728,"div",13)(729,"pre")(730,"span",14),t(731,"forLoopVariableTypes"),e(),t(732,"       "),n(733,"span",15),t(734,"@for loop vars"),e(),t(735,`
`),n(736,"span",14),t(737,"letDeclarationTypes"),e(),t(738,"        "),n(739,"span",15),t(740,"@let decls"),e(),t(741,`
`),n(742,"span",14),t(743,"templateReferenceTypes"),e(),t(744,"     "),n(745,"span",15),t(746,"#ref types"),e(),t(747,`
`),n(748,"span",14),t(749,"twoWayBindingSignalTypes"),e(),t(750,"   "),n(751,"span",15),t(752,"[(model)]"),e(),t(753,`
`),n(754,"span",14),t(755,"structuralDirectiveVars"),e(),t(756,"    "),n(757,"span",15),t(758,"*ngFor/*ngIf"),e(),t(759,`
`),n(760,"span",14),t(761,"requiredInputIndicator"),e(),t(762,"     "),n(763,"span",15),t(764,"! marker"),e(),t(765,`
`),n(766,"span",14),t(767,"propertyBindingTypes"),e(),t(768,"       "),n(769,"span",15),t(770,"[prop] types"),e()()()()(),n(771,"h4",21),t(772,"Fine-Grained Event Parameter Config"),e(),n(773,"div",7)(774,"pre")(775,"span",8),t(776,"// Show only component event hints, hide native HTML event hints"),e(),t(777),n(778,"span",18),t(779,"// Hide: (click): PointerEvent"),e(),t(780,`
    componentEvents: true,    `),n(781,"span",18),t(782,"// Show: (customEvent): string"),e(),t(783,`
    animationEvents: true,    `),n(784,"span",18),t(785,"// Show: (@fade.done): AnimationEvent"),e(),t(786),e()(),n(787,"h4"),t(788,"Fine-Grained Property Binding Config"),e(),n(789,"div",7)(790,"pre")(791,"span",8),t(792,"// Show only component input hints, hide native property hints"),e(),t(793),n(794,"span",18),t(795,"// Hide: [disabled]: boolean"),e(),t(796,`
    componentInputs: true,     `),n(797,"span",18),t(798,"// Show: [user]: User"),e(),t(799),e()()(),n(800,"section",22)(801,"h3"),t(802,"Inlay Hints + Optional Chaining"),e(),n(803,"p",6),t(804," With "),n(805,"strong"),t(806,"native optional chaining"),e(),t(807,", inlay hints make the "),n(808,"code"),t(809,"null"),e(),t(810," vs "),n(811,"code"),t(812,"undefined"),e(),t(813," difference visible in the editor: "),e(),n(814,"div",10)(815,"div",23)(816,"div",12),t(817,"Legacy \u2014 returns null"),e(),n(818,"div",13)(819,"pre"),t(820),n(821,"span",15),t(822,": string | "),n(823,"span",24),t(824,"null"),e()(),t(825,`
@if (user?.addr; as `),n(826,"span",14),t(827,"a"),e(),n(828,"span",15),t(829,": Addr | "),n(830,"span",24),t(831,"null"),e()(),t(832,")"),e()()(),n(833,"div",25)(834,"div",12),t(835,"Native \u2014 returns undefined"),e(),n(836,"div",13)(837,"pre"),t(838),n(839,"span",15),t(840,": string | "),n(841,"span",20),t(842,"undefined"),e()(),t(843,`
@if (user?.addr; as `),n(844,"span",14),t(845,"a"),e(),n(846,"span",15),t(847,": Addr | "),n(848,"span",20),t(849,"undefined"),e()(),t(850,")"),e()()()(),n(851,"div",26)(852,"strong"),t(853,"At a glance"),e(),t(854," see whether "),n(855,"code"),t(856,"?."),e(),t(857," returns "),n(858,"code"),t(859,"null"),e(),t(860," or "),n(861,"code"),t(862,"undefined"),e(),t(863,". The inlay hint type immediately reveals which semantics are active per component. "),e()()()),o&2&&(i(20),m(`// VS Code settings.json
`,"{",`
  `),i(21),m(`
  "angular.inlayHints.variableTypeHintsWhenTypeMatchesName": true,
  "angular.inlayHints.interactiveInlayHints": false
`,"}"),i(17),l(" of users; track user.id) ","{",`
  `,"{{ user.name }}",`
`,"}"),i(50),l(") ","{",`
  `,"{{ u.name }}",`
`,"}"),i(80),r(") ","{",`
  @case (Status.Active) `,"{"," Active ","}",`
`,"}",`
@switch (`),i(5),r(") ","{",`
  @case (1) `,"{"," First ","}",`
`,"}"),i(15),d(") ","{",`
  <heavy-component />
`,"}",`

<ng-template let-`),i(41),d("ifAliasTypes: ","{",`
  simpleExpressions: false,
  complexExpressions: true
`,"}",`

@if (cond1; as `),i(5),d(") ","{",` ...
`,"}"," @else if (cond2; as "),i(5),d(") ","{",` ...
`,"}"),i(102),d("eventParameterTypes: ","{",`
  componentEvents: false,
  nativeEvents: true,
  animationEvents: true
`,"}"),i(56),m("host: ","{",`
  '(`),i(9),m(`)': 'onShift()',
  '[disabled]': 'isDisabled',
  '[class.active]': 'isActive',
  '[style.width.px]': 'width',
  '[attr.aria-label]': 'label'
`,"}"),i(8),d(`@HostBinding('disabled') isDisabled = false;
@HostBinding('class.active') isActive = true;
@HostBinding('style.width.px') width = 100;
@HostBinding('attr.aria-label') ariaLabel;

host: `,"{",`
  '[@fade]': 'state',
  '(@fade.done)': 'onDone($event)'
`,"}"),i(12),a("{{ name | upper"),i(3),d(" ","}}",`
`,"{{ data$ | async"),i(3),d(" ","}}",`
`,"{{ name | format : "),i(9),d(" ","}}",`
`,"{{ today | date : "),i(6),m(" ","}}"),i(10),m(`
`,"{{ name | nullable"),i(3),m(" ","}}",`
`),i(3),m(`
`,"{{ name | prefix : ","'['"),i(6),m(" ","}}"),i(49),d(`

propertyBindingTypes: `,"{",`
  componentInputs: true,
  nativeProperties: false
`,"}"),i(21),m(`
`,"{{ formatValue("),i(3),m(" 42, name",") }}",`
(click)="log(`),i(26),m(`

`,"{{ format("),i(6),m(" 42",") }}"),i(12),a("{{ items.filter(("),i(5),d(") => item.active",") }}",`
`,"{{ items.reduce((a, b)"),i(3),m(" => a + b",") }}"),i(60),m(`
`,"{{ name | invalid }}","      "),i(103),d(`
`,"{",`
  eventParameterTypes: `,"{",`
    nativeEvents: false,      `),i(9),d(`
  `,"}",`
`,"}"),i(7),d(`
`,"{",`
  propertyBindingTypes: `,"{",`
    nativeProperties: false,   `),i(6),d(`
  `,"}",`
`,"}"),i(21),a("{{ user?.name }}"),i(18),a("{{ user?.name }}"))},styles:[".demo-page[_ngcontent-%COMP%]{max-width:960px;margin:0 auto;padding:32px 32px 64px}.demo-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap}.demo-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:28px;font-weight:700;margin:0}.badge[_ngcontent-%COMP%]{font-size:11px;font-weight:600;font-family:JetBrains Mono,monospace;background:#f0a0c81f;color:var(--adev-primary, #f0a0c8);border:1px solid rgba(240,160,200,.25);padding:3px 10px;border-radius:6px}.test-badge[_ngcontent-%COMP%]{background:#22c55e1f;color:#22c55e;border-color:#22c55e40}.demo-description[_ngcontent-%COMP%]{color:var(--adev-text-secondary, #94a3b8);font-size:15px;line-height:1.7;margin-bottom:32px}.example-section[_ngcontent-%COMP%]{margin-bottom:32px}.example-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:18px;font-weight:600;margin:0 0 8px;padding-bottom:8px;border-bottom:1px solid var(--adev-border, #334155)}.desc[_ngcontent-%COMP%]{font-size:14px;color:var(--adev-text-secondary, #94a3b8);line-height:1.6;margin:0 0 16px}.hint-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.hint-example[_ngcontent-%COMP%]{background:var(--adev-surface, #1e293b);border:1px solid var(--adev-border, #334155);border-radius:8px;padding:16px}.hint-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--adev-text-secondary, #94a3b8);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}.code-block[_ngcontent-%COMP%]{background:var(--adev-code-bg, #0f172a);border:1px solid var(--adev-code-border, #1e293b);border-radius:6px;overflow-x:auto}.code-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0;padding:12px 14px;font-size:13px;line-height:1.6;border:none;background:none}.code-block.wide[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{padding:16px}.config-tag[_ngcontent-%COMP%]{margin-top:10px;font-size:11px;font-family:JetBrains Mono,monospace;color:var(--adev-text-tertiary, #64748b)}.config-section[_ngcontent-%COMP%]   .code-block[_ngcontent-%COMP%]{background:var(--adev-surface, #1e293b);border-color:var(--adev-border, #334155)}.test-ref[_ngcontent-%COMP%]{margin-top:4px;font-size:10px;font-family:JetBrains Mono,monospace;color:#22c55e;opacity:.7}.hl-var[_ngcontent-%COMP%]{color:#7dd3fc}.hl-hint[_ngcontent-%COMP%]{color:var(--adev-primary, #f0a0c8);opacity:.7;font-style:italic}.hl-event[_ngcontent-%COMP%]{color:#fbbf24}.hl-comment[_ngcontent-%COMP%]{color:#64748b;font-style:italic}.hl-dim[_ngcontent-%COMP%]{color:#475569}.hl-warn[_ngcontent-%COMP%]{color:#fb923c;font-weight:600}.hl-good[_ngcontent-%COMP%]{color:#22c55e;font-weight:600}.note-box[_ngcontent-%COMP%]{background:var(--adev-surface, #1e293b);border:1px solid var(--adev-border, #334155);border-left:3px solid var(--adev-info, #3b82f6);border-radius:8px;padding:14px 16px;font-size:14px;color:var(--adev-text-secondary, #94a3b8);line-height:1.6;margin-top:12px}.highlight-section[_ngcontent-%COMP%]{background:linear-gradient(135deg,#f0a0c80a,#38bdf80a);border:1px solid rgba(240,160,200,.15);border-radius:12px;padding:20px}.legacy-example[_ngcontent-%COMP%]{border-left:3px solid #fb923c}.native-example[_ngcontent-%COMP%]{border-left:3px solid #22c55e}@media(max-width:768px){.hint-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.demo-page[_ngcontent-%COMP%]{padding:20px 16px}}"]})};export{p as InlayHintsDemoComponent};
