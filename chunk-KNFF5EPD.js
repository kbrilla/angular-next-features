import{Ab as l,Ba as i,Bb as r,La as s,db as e,eb as n,wb as t,xb as o,yb as m,zb as d}from"./chunk-SRJJA7DK.js";var p=class E{static \u0275fac=function(a){return new(a||E)};static \u0275cmp=s({type:E,selectors:[["app-inlay-hints-demo"]],decls:743,vars:55,consts:[[1,"demo-page"],[1,"demo-header"],[1,"badge"],[1,"badge","test-badge"],[1,"demo-description"],[1,"example-section","config-section"],[1,"desc"],[1,"code-block","wide"],[1,"hl-comment"],[1,"example-section"],[1,"hint-grid"],[1,"hint-example"],[1,"hint-label"],[1,"code-block"],[1,"hl-var"],[1,"hl-hint"],[1,"config-tag"],[1,"test-ref"],[1,"hl-dim"],[1,"hl-event"],[1,"example-section","highlight-section"],[1,"hint-example","legacy-example"],[1,"hl-warn"],[1,"hint-example","native-example"],[1,"hl-good"],[1,"note-box"]],template:function(a,c){a&1&&(e(0,"div",0)(1,"div",1)(2,"h2"),t(3,"Angular-Specific Inlay Hints"),n(),e(4,"span",2),t(5,"LSP 3.17"),n(),e(6,"span",3),t(7,"118 Test Cases"),n()(),e(8,"p",4),t(9," Rich, configurable inlay hints for Angular templates \u2014 showing types for control flow variables, event parameters, pipe outputs, input bindings, host bindings, and more. Fully aligned with TypeScript's inlay hints configuration. All examples below are derived from the actual spec ("),e(10,"code"),t(11,"inlay_hints_spec.ts"),n(),t(12,") with 118 test scenarios. "),n(),e(13,"section",5)(14,"h3"),t(15,"Complete Configuration Reference"),n(),e(16,"p",6),t(17," All options configurable via VS Code settings or Angular language service plugin config. Options mirror TypeScript's where applicable. "),n(),e(18,"div",7)(19,"pre"),t(20),e(21,"span",8),t(22,"// Variable Type Hints"),n(),t(23,`
  "angular.inlayHints.forLoopVariableTypes": true,
  "angular.inlayHints.ifAliasTypes": "complex",
  "angular.inlayHints.letDeclarationTypes": true,
  "angular.inlayHints.referenceVariableTypes": true,
  "angular.inlayHints.switchExpressionTypes": true,
  "angular.inlayHints.deferTriggerTypes": true,

  `),e(24,"span",8),t(25,"// Event Parameter Hints"),n(),t(26,`
  "angular.inlayHints.eventParameterTypes": true,
  "angular.inlayHints.hostListenerArgumentTypes": true,

  `),e(27,"span",8),t(28,"// Property Binding Hints"),n(),t(29,`
  "angular.inlayHints.propertyBindingTypes": true,
  "angular.inlayHints.requiredInputIndicator": "none",

  `),e(30,"span",8),t(31,"// Pipe Hints"),n(),t(32,`
  "angular.inlayHints.pipeOutputTypes": true,

  `),e(33,"span",8),t(34,"// Parameter Name Hints"),n(),t(35,`
  "angular.inlayHints.parameterNameHints": "all",
  "angular.inlayHints.parameterNameHintsWhenArgumentMatchesName": false,

  `),e(36,"span",8),t(37,"// Arrow Function Hints"),n(),t(38,`
  "angular.inlayHints.arrowFunctionParameterTypes": true,
  "angular.inlayHints.arrowFunctionReturnTypes": true,

  `),e(39,"span",8),t(40,"// Behavior Modifiers"),n(),t(41),n()()(),e(42,"section",9)(43,"h3"),t(44,"1. Variable Type Hints"),n(),e(45,"p",6),t(46," Inline type annotations for template-declared variables. Covers @for, @if, @let, template refs, @switch, @defer, ng-template, and legacy structural directives. "),n(),e(47,"div",10)(48,"div",11)(49,"div",12),t(50,"@for loop variable"),n(),e(51,"div",13)(52,"pre"),t(53,"@for ("),e(54,"span",14),t(55,"user"),n(),e(56,"span",15),t(57,": User"),n(),t(58),n()(),e(59,"div",16),t(60,"forLoopVariableTypes: true"),n(),e(61,"div",17),t(62,"Spec #1"),n()(),e(63,"div",11)(64,"div",12),t(65,"@for context variables"),n(),e(66,"div",13)(67,"pre"),t(68,"@for ("),e(69,"span",14),t(70,"item"),n(),e(71,"span",15),t(72,": string"),n(),t(73,` of items; track $index;
  let `),e(74,"span",14),t(75,"i"),n(),e(76,"span",15),t(77,": number"),n(),t(78,` = $index,
      `),e(79,"span",14),t(80,"c"),n(),e(81,"span",15),t(82,": number"),n(),t(83,` = $count,
      `),e(84,"span",14),t(85,"f"),n(),e(86,"span",15),t(87,": boolean"),n(),t(88,` = $first,
      `),e(89,"span",14),t(90,"l"),n(),e(91,"span",15),t(92,": boolean"),n(),t(93," = $last)"),n()(),e(94,"div",16),t(95,"forLoopVariableTypes: true"),n(),e(96,"div",17),t(97,"Spec #2, #113 \u2014 no duplicate hints"),n()(),e(98,"div",11)(99,"div",12),t(100,"@if alias (simple)"),n(),e(101,"div",13)(102,"pre"),t(103,"@if (currentUser; as "),e(104,"span",14),t(105,"u"),n(),e(106,"span",15),t(107,": User"),n(),t(108),n()(),e(109,"div",16),t(110,"ifAliasTypes: true"),n(),e(111,"div",17),t(112,"Spec #3 \u2014 type narrowing applied"),n()(),e(113,"div",11)(114,"div",12),t(115,"@if alias (complex mode)"),n(),e(116,"div",13)(117,"pre")(118,"span",8),t(119,"// ifAliasTypes: 'complex' \u2014 hides simple reads"),n(),t(120,`
@if (currentUser; as u)     `),e(121,"span",18),t(122,"// NO hint (simple)"),n(),t(123,`
@if (user?.name; as `),e(124,"span",14),t(125,"n"),n(),e(126,"span",15),t(127,": string"),n(),t(128,`)
@if (items.length > 0; as `),e(129,"span",14),t(130,"ok"),n(),e(131,"span",15),t(132,": boolean"),n(),t(133,")"),n()(),e(134,"div",16),t(135,"ifAliasTypes: 'complex'"),n(),e(136,"div",17),t(137,"Spec #79-81 \u2014 smart filtering"),n()(),e(138,"div",11)(139,"div",12),t(140,"@let declarations"),n(),e(141,"div",13)(142,"pre"),t(143,"@let "),e(144,"span",14),t(145,"count"),n(),e(146,"span",15),t(147,": number"),n(),t(148,` = items.length;
@let `),e(149,"span",14),t(150,"doubled"),n(),e(151,"span",15),t(152,": number"),n(),t(153," = count * 2;"),n()(),e(154,"div",16),t(155,"letDeclarationTypes: true"),n(),e(156,"div",17),t(157,"Spec #5"),n()(),e(158,"div",11)(159,"div",12),t(160,"Template references"),n(),e(161,"div",13)(162,"pre"),t(163,"<input "),e(164,"span",14),t(165,"#nameInput"),n(),e(166,"span",15),t(167,": HTMLInputElement"),n(),t(168,` />
<div tooltip `),e(169,"span",14),t(170,"#tip"),n(),e(171,"span",15),t(172,": TooltipDirective"),n(),t(173,'="tooltip">'),n()(),e(174,"div",16),t(175,"referenceVariableTypes: true"),n(),e(176,"div",17),t(177,"Spec #13-14"),n()(),e(178,"div",11)(179,"div",12),t(180,"@switch expressions"),n(),e(181,"div",13)(182,"pre"),t(183,"@switch ("),e(184,"span",14),t(185,"status"),n(),e(186,"span",15),t(187,": Status"),n(),t(188),e(189,"span",14),t(190,"user?.id"),n(),e(191,"span",15),t(192,": number | undefined"),n(),t(193),n()(),e(194,"div",16),t(195,"switchExpressionTypes: true"),n(),e(196,"div",17),t(197,"Spec #43-46"),n()(),e(198,"div",11)(199,"div",12),t(200,"@defer trigger & ng-template"),n(),e(201,"div",13)(202,"pre"),t(203,"@defer (when "),e(204,"span",14),t(205,"isVisible"),n(),e(206,"span",15),t(207,": boolean"),n(),t(208),e(209,"span",14),t(210,"user"),n(),e(211,"span",15),t(212,": User"),n(),t(213,`
  let-`),e(214,"span",14),t(215,"extra"),n(),e(216,"span",15),t(217,": string"),n(),t(218,'="extra">'),n()(),e(219,"div",17),t(220,"Spec #47-49"),n()(),e(221,"div",11)(222,"div",12),t(223,"*ngFor / *ngIf (legacy)"),n(),e(224,"div",13)(225,"pre"),t(226,'<li *ngFor="let '),e(227,"span",14),t(228,"item"),n(),e(229,"span",15),t(230,": string"),n(),t(231,` of items;
  let `),e(232,"span",14),t(233,"idx"),n(),e(234,"span",15),t(235,": number"),n(),t(236,` = index">
<div *ngIf="data as `),e(237,"span",14),t(238,"result"),n(),e(239,"span",15),t(240,": Data"),n(),t(241,'">'),n()(),e(242,"div",17),t(243,"Spec #15, #50"),n()(),e(244,"div",11)(245,"div",12),t(246,"@if fine-grained & @else if"),n(),e(247,"div",13)(248,"pre"),t(249),e(250,"span",14),t(251,"a"),n(),e(252,"span",15),t(253,": string"),n(),t(254),e(255,"span",14),t(256,"b"),n(),e(257,"span",15),t(258,": number"),n(),t(259),n()(),e(260,"div",17),t(261,"Spec #4, #82"),n()()()(),e(262,"section",9)(263,"h3"),t(264,"2. Event Parameter Type Hints"),n(),e(265,"p",6),t(266," Shows the inferred type of "),e(267,"code"),t(268,"$event"),n(),t(269,". Configurable per source: native DOM events, component outputs, animation events. 16 tested DOM event types. "),n(),e(270,"div",10)(271,"div",11)(272,"div",12),t(273,"Native DOM events"),n(),e(274,"div",13)(275,"pre"),t(276,"<button ("),e(277,"span",19),t(278,"click"),n(),e(279,"span",15),t(280,": MouseEvent"),n(),t(281,`)="onClick($event)">
<input (`),e(282,"span",19),t(283,"keydown"),n(),e(284,"span",15),t(285,": KeyboardEvent"),n(),t(286,`)="onKey($event)">
<input (`),e(287,"span",19),t(288,"keydown.enter"),n(),e(289,"span",15),t(290,": KeyboardEvent"),n(),t(291,`)="enter()">
<input (`),e(292,"span",19),t(293,"focus"),n(),e(294,"span",15),t(295,": FocusEvent"),n(),t(296,`)="onFocus($event)">
<input (`),e(297,"span",19),t(298,"input"),n(),e(299,"span",15),t(300,": Event"),n(),t(301,`)="onInput($event)">
<div (`),e(302,"span",19),t(303,"dragover"),n(),e(304,"span",15),t(305,": DragEvent"),n(),t(306,')="onDrag($event)">'),n()(),e(307,"div",16),t(308,"eventParameterTypes: true"),n(),e(309,"div",17),t(310,"Spec #70-77"),n()(),e(311,"div",11)(312,"div",12),t(313,"Component output / model()"),n(),e(314,"div",13)(315,"pre")(316,"span",8),t(317,"// EventEmitter<string>"),n(),t(318,`
<app (`),e(319,"span",19),t(320,"queryChange"),n(),e(321,"span",15),t(322,": string"),n(),t(323,`)="onSearch($event)">
`),e(324,"span",8),t(325,"// output<number>()"),n(),t(326,`
<app (`),e(327,"span",19),t(328,"changed"),n(),e(329,"span",15),t(330,": number"),n(),t(331,`)="onChange($event)">
`),e(332,"span",8),t(333,"// model() change"),n(),t(334,`
<app ((`),e(335,"span",19),t(336,"valueChange"),n(),e(337,"span",15),t(338,": string"),n(),t(339,'))="val = $event">'),n()(),e(340,"div",17),t(341,"Spec #52-54"),n()(),e(342,"div",11)(343,"div",12),t(344,"Animation events"),n(),e(345,"div",13)(346,"pre"),t(347,`<div [@anim]="state"
  (@anim.done`),e(348,"span",15),t(349,": AnimationEvent"),n(),t(350,`)="onDone($event)"
  (@anim.start`),e(351,"span",15),t(352,": AnimationEvent"),n(),t(353,')="onStart($event)">'),n()(),e(354,"div",17),t(355,"Spec #55"),n()(),e(356,"div",11)(357,"div",12),t(358,"Fine-grained event config"),n(),e(359,"div",13)(360,"pre"),t(361),n()(),e(362,"div",17),t(363,"Spec #68-69"),n()()()(),e(364,"section",9)(365,"h3"),t(366,"3. Host Binding & @HostListener Hints"),n(),e(367,"p",6),t(368," Hints work in host bindings and @HostListener decorators \u2014 $event property access, window/document events, keyboard modifiers, method calls, arithmetic expressions. "),e(369,"strong"),t(370,"15 distinct test cases."),n()(),e(371,"div",10)(372,"div",11)(373,"div",12),t(374,"@HostListener $event properties"),n(),e(375,"div",13)(376,"pre"),t(377,`@HostListener('click', [
  '`),e(378,"span",14),t(379,"$event.target"),n(),e(380,"span",15),t(381,": EventTarget"),n(),t(382,`',
  '`),e(383,"span",14),t(384,"$event.clientX"),n(),e(385,"span",15),t(386,": number"),n(),t(387,`',
  '`),e(388,"span",14),t(389,"$event.clientY"),n(),e(390,"span",15),t(391,": number"),n(),t(392,`'
])`),n()(),e(393,"div",17),t(394,"Spec #18, #41"),n()(),e(395,"div",11)(396,"div",12),t(397,"Window/Document events"),n(),e(398,"div",13)(399,"pre"),t(400,"@HostListener('"),e(401,"span",19),t(402,"window:resize"),n(),t(403,`',
  ['$event.target.innerWidth'])
@HostListener('`),e(404,"span",19),t(405,"document:keydown"),n(),t(406,`',
  ['$event.key', '$event.ctrlKey'])
@HostListener('click',
  ['$event.target`),e(407,"span",19),t(408,"?."),n(),t(409,"nodeName'])"),n()(),e(410,"div",17),t(411,"Spec #22-24"),n()(),e(412,"div",11)(413,"div",12),t(414,"Host metadata (mixed)"),n(),e(415,"div",13)(416,"pre"),t(417),e(418,"span",19),t(419,"click"),n(),t(420,`)': 'onClick($event)',
  '(`),e(421,"span",19),t(422,"keydown.enter"),n(),t(423,`)': 'onEnter($event)',
  '(`),e(424,"span",19),t(425,"keydown.shift.enter"),n(),t(426),n()(),e(427,"div",17),t(428,"Spec #35-42"),n()(),e(429,"div",11)(430,"div",12),t(431,"@HostBinding types & animation"),n(),e(432,"div",13)(433,"pre"),t(434),n()(),e(435,"div",17),t(436,"Spec #30-35, #42"),n()()()(),e(437,"section",9)(438,"h3"),t(439,"4. Pipe Output & Parameter Hints"),n(),e(440,"div",10)(441,"div",11)(442,"div",12),t(443,"Return type & parameter names"),n(),e(444,"div",13)(445,"pre"),t(446),e(447,"span",15),t(448,": string"),n(),t(449),e(450,"span",15),t(451,": Data | null"),n(),t(452),e(453,"span",15),t(454,"prefix:"),n(),t(455," '[' : "),e(456,"span",15),t(457,"suffix:"),n(),t(458," ']'"),e(459,"span",15),t(460,": string"),n(),t(461),e(462,"span",15),t(463,"format:"),n(),t(464," 'short'"),e(465,"span",15),t(466,": string | null"),n(),t(467),n()(),e(468,"div",17),t(469,"Spec #8-12"),n()(),e(470,"div",11)(471,"div",12),t(472,"Overloaded & chained"),n(),e(473,"div",13)(474,"pre")(475,"span",8),t(476,"// Overloaded: resolves by input type"),n(),t(477),e(478,"span",15),t(479,": string | null"),n(),t(480),e(481,"span",8),t(482,"// Chained: each gets own type hint"),n(),t(483),e(484,"span",15),t(485,": string"),n(),t(486,`
  | suffix : ']'`),e(487,"span",15),t(488,": string"),n(),t(489),n()(),e(490,"div",17),t(491,"Spec #11, #105"),n()()()(),e(492,"section",9)(493,"h3"),t(494,"5. Property Binding & Input Hints"),n(),e(495,"div",10)(496,"div",11)(497,"div",12),t(498,"Input types & required indicators"),n(),e(499,"div",13)(500,"pre"),t(501,"<div ["),e(502,"span",14),t(503,"user"),n(),e(504,"span",15),t(505,": User"),n(),t(506,`]="currentUser">
`),e(507,"span",8),t(508,"// requiredInputIndicator: 'asterisk'"),n(),t(509,`
<app [`),e(510,"span",14),t(511,"config"),n(),e(512,"span",15),t(513,": FormConfig*"),n(),t(514,`]="cfg">
`),e(515,"span",8),t(516,"// requiredInputIndicator: 'exclamation'"),n(),t(517,`
<app [`),e(518,"span",14),t(519,"config"),n(),e(520,"span",15),t(521,": FormConfig!"),n(),t(522,']="cfg">'),n()(),e(523,"div",17),t(524,"Spec #51, #86-89"),n()(),e(525,"div",11)(526,"div",12),t(527,"Text attrs & fine-grained config"),n(),e(528,"div",13)(529,"pre"),t(530,`<div textInput
  `),e(531,"span",14),t(532,"text"),n(),e(533,"span",15),t(534,": string!"),n(),t(535,`="hello">
`),e(536,"span",8),t(537,"// NOT shown for regular HTML attrs"),n(),t(538),n()(),e(539,"div",17),t(540,"Spec #84-85, #90-92"),n()()()(),e(541,"section",9)(542,"h3"),t(543,"6. Parameter Name Hints"),n(),e(544,"div",10)(545,"div",11)(546,"div",12),t(547,"All mode & literals only"),n(),e(548,"div",13)(549,"pre"),t(550,'(click)="moveTo('),e(551,"span",15),t(552,"x:"),n(),t(553," 100, "),e(554,"span",15),t(555,"y:"),n(),t(556,` 200)"

`),e(557,"span",8),t(558,"// 'literals' mode: only for non-variable args"),n(),t(559),e(560,"span",15),t(561,"num:"),n(),t(562),e(563,"span",15),t(564,"msg:"),n(),t(565,' `hello`)"\n(click)="setItems('),e(566,"span",15),t(567,"items:"),n(),t(568,' [1,2,3])"'),n()(),e(569,"div",17),t(570,"Spec #58, #60, #95-99"),n()(),e(571,"div",11)(572,"div",12),t(573,"Rest params & overloads"),n(),e(574,"div",13)(575,"pre"),t(576,'(click)="log('),e(577,"span",15),t(578,"prefix:"),n(),t(579,` 'msg',
  `),e(580,"span",15),t(581,"...items:"),n(),t(582,` 'a', 'b', 'c')"

`),e(583,"span",8),t(584,"// Suppressed when arg matches param name:"),n(),t(585,`
(click)="handleClick(event)" `),e(586,"span",18),t(587,"// NO hint"),n(),t(588),e(589,"span",15),t(590,"value:"),n(),t(591," 'hello', "),e(592,"span",15),t(593,"count:"),n(),t(594),n()(),e(595,"div",17),t(596,"Spec #61-64, #101-102"),n()()()(),e(597,"section",9)(598,"h3"),t(599,"7. Arrow Functions, Generics & Edge Cases"),n(),e(600,"div",10)(601,"div",11)(602,"div",12),t(603,"Arrow function types"),n(),e(604,"div",13)(605,"pre"),t(606),e(607,"span",14),t(608,"item"),n(),e(609,"span",15),t(610,": Item"),n(),t(611),e(612,"span",15),t(613,": number"),n(),t(614),n()(),e(615,"div",17),t(616,"Spec #93"),n()(),e(617,"div",11)(618,"div",12),t(619,"Generic inference"),n(),e(620,"div",13)(621,"pre"),t(622,"@let "),e(623,"span",14),t(624,"result"),n(),e(625,"span",15),t(626,": string"),n(),t(627,` = identity('hello');
@let `),e(628,"span",14),t(629,"box"),n(),e(630,"span",15),t(631,": Box<number>"),n(),t(632," = makeBox(123);"),n()(),e(633,"div",17),t(634,"Spec #107-108"),n()(),e(635,"div",11)(636,"div",12),t(637,"Type-matches-name suppression"),n(),e(638,"div",13)(639,"pre")(640,"span",8),t(641,"// variableTypeHintsWhenTypeMatchesName: false"),n(),t(642,`
@for (user of users; ...) `),e(643,"span",18),t(644,'// hide ": User"'),n(),t(645,`
@for (item of people; ...) `),e(646,"span",14),t(647,"item"),n(),e(648,"span",15),t(649,": Person"),n(),t(650,`
`),e(651,"span",8),t(652,"// Case-insensitive, generic-aware"),n()()(),e(653,"div",17),t(654,"Spec #56-57, #117-118"),n()(),e(655,"div",11)(656,"div",12),t(657,"Interactive & graceful fallback"),n(),e(658,"div",13)(659,"pre")(660,"span",8),t(661,"// interactiveInlayHints: true"),n(),t(662,`
`),e(663,"span",8),t(664,'// Click ": User" to navigate to definition'),n(),t(665,`

`),e(666,"span",8),t(667,"// No crash on:"),n(),t(668,`
(click)="doSomething()"  `),e(669,"span",8),t(670,"// 0 args"),n(),t(671,`
obj?.method?.(42)         `),e(672,"span",8),t(673,"// safe call"),n(),t(674),e(675,"span",8),t(676,"// no transform"),n()()(),e(677,"div",17),t(678,"Spec #103, #106, #111-115"),n()()()(),e(679,"section",20)(680,"h3"),t(681,"Inlay Hints + Optional Chaining"),n(),e(682,"p",6),t(683," With "),e(684,"strong"),t(685,"native optional chaining"),n(),t(686,", inlay hints make the "),e(687,"code"),t(688,"null"),n(),t(689," vs "),e(690,"code"),t(691,"undefined"),n(),t(692," difference visible in the editor: "),n(),e(693,"div",10)(694,"div",21)(695,"div",12),t(696,"Legacy \u2014 returns null"),n(),e(697,"div",13)(698,"pre"),t(699),e(700,"span",15),t(701,": string | "),e(702,"span",22),t(703,"null"),n()(),t(704,`
@if (user?.addr; as `),e(705,"span",14),t(706,"a"),n(),e(707,"span",15),t(708,": Addr | "),e(709,"span",22),t(710,"null"),n()(),t(711,")"),n()()(),e(712,"div",23)(713,"div",12),t(714,"Native \u2014 returns undefined"),n(),e(715,"div",13)(716,"pre"),t(717),e(718,"span",15),t(719,": string | "),e(720,"span",24),t(721,"undefined"),n()(),t(722,`
@if (user?.addr; as `),e(723,"span",14),t(724,"a"),n(),e(725,"span",15),t(726,": Addr | "),e(727,"span",24),t(728,"undefined"),n()(),t(729,")"),n()()()(),e(730,"div",25)(731,"strong"),t(732,"At a glance"),n(),t(733," see whether "),e(734,"code"),t(735,"?."),n(),t(736," returns "),e(737,"code"),t(738,"null"),n(),t(739," or "),e(740,"code"),t(741,"undefined"),n(),t(742,". The inlay hint type immediately reveals which semantics are active per component. "),n()()()),a&2&&(i(20),m(`// VS Code settings.json
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
`,"}"),i(12),o("{{ name | upper"),i(3),d(" ","}}",`
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

`,"{{ format("),i(6),m(" 42",") }}"),i(12),o("{{ items.filter(("),i(5),d(") => item.active",") }}",`
`,"{{ items.reduce((a, b)"),i(3),m(" => a + b",") }}"),i(60),m(`
`,"{{ name | invalid }}","      "),i(25),o("{{ user?.name }}"),i(18),o("{{ user?.name }}"))},styles:[".demo-page[_ngcontent-%COMP%]{max-width:960px;margin:0 auto;padding:32px 32px 64px}.demo-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap}.demo-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:28px;font-weight:700;margin:0}.badge[_ngcontent-%COMP%]{font-size:11px;font-weight:600;font-family:JetBrains Mono,monospace;background:#f0a0c81f;color:var(--adev-primary, #f0a0c8);border:1px solid rgba(240,160,200,.25);padding:3px 10px;border-radius:6px}.test-badge[_ngcontent-%COMP%]{background:#22c55e1f;color:#22c55e;border-color:#22c55e40}.demo-description[_ngcontent-%COMP%]{color:var(--adev-text-secondary, #94a3b8);font-size:15px;line-height:1.7;margin-bottom:32px}.example-section[_ngcontent-%COMP%]{margin-bottom:32px}.example-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:18px;font-weight:600;margin:0 0 8px;padding-bottom:8px;border-bottom:1px solid var(--adev-border, #334155)}.desc[_ngcontent-%COMP%]{font-size:14px;color:var(--adev-text-secondary, #94a3b8);line-height:1.6;margin:0 0 16px}.hint-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.hint-example[_ngcontent-%COMP%]{background:var(--adev-surface, #1e293b);border:1px solid var(--adev-border, #334155);border-radius:8px;padding:16px}.hint-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--adev-text-secondary, #94a3b8);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}.code-block[_ngcontent-%COMP%]{background:var(--adev-code-bg, #0f172a);border:1px solid var(--adev-code-border, #1e293b);border-radius:6px;overflow-x:auto}.code-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0;padding:12px 14px;font-size:13px;line-height:1.6;border:none;background:none}.code-block.wide[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{padding:16px}.config-tag[_ngcontent-%COMP%]{margin-top:10px;font-size:11px;font-family:JetBrains Mono,monospace;color:var(--adev-text-tertiary, #64748b)}.config-section[_ngcontent-%COMP%]   .code-block[_ngcontent-%COMP%]{background:var(--adev-surface, #1e293b);border-color:var(--adev-border, #334155)}.test-ref[_ngcontent-%COMP%]{margin-top:4px;font-size:10px;font-family:JetBrains Mono,monospace;color:#22c55e;opacity:.7}.hl-var[_ngcontent-%COMP%]{color:#7dd3fc}.hl-hint[_ngcontent-%COMP%]{color:var(--adev-primary, #f0a0c8);opacity:.7;font-style:italic}.hl-event[_ngcontent-%COMP%]{color:#fbbf24}.hl-comment[_ngcontent-%COMP%]{color:#64748b;font-style:italic}.hl-dim[_ngcontent-%COMP%]{color:#475569}.hl-warn[_ngcontent-%COMP%]{color:#fb923c;font-weight:600}.hl-good[_ngcontent-%COMP%]{color:#22c55e;font-weight:600}.note-box[_ngcontent-%COMP%]{background:var(--adev-surface, #1e293b);border:1px solid var(--adev-border, #334155);border-left:3px solid var(--adev-info, #3b82f6);border-radius:8px;padding:14px 16px;font-size:14px;color:var(--adev-text-secondary, #94a3b8);line-height:1.6;margin-top:12px}.highlight-section[_ngcontent-%COMP%]{background:linear-gradient(135deg,#f0a0c80a,#38bdf80a);border:1px solid rgba(240,160,200,.15);border-radius:12px;padding:20px}.legacy-example[_ngcontent-%COMP%]{border-left:3px solid #fb923c}.native-example[_ngcontent-%COMP%]{border-left:3px solid #22c55e}@media(max-width:768px){.hint-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.demo-page[_ngcontent-%COMP%]{padding:20px 16px}}"]})};export{p as InlayHintsDemoComponent};
