import type { FileNode } from '../VSCodePortfolio'

export const initialFs: FileNode[] = [
  {
    type: 'folder',
    name: 'portfolio',
    children: [
      { type: 'file', name: 'README.md', ext: 'md', content: `/**\n * @author Saravanan Kalimuthu\n * @role Senior Software Engineer\n * @experience 8+ Years\n */\npublic class SaravananPortfolio implements FullStackDeveloper {\n    private final String motto = \"I build reliable web apps and automations that save teams time.\";\n    private final String[] interests = {\"Automation\", \"Open Source\"};\n    \n    public String getCurrentStatus() {\n        return \"Open to impactful opportunities\";\n    }\n}` },
      { type: 'file', name: 'about.java', ext: 'java', content: `@Profile(name=\"Saravanan Kalimuthu\")\nclass About {\n  String email = \"sarvaruna@outlook.com\";\n  String location = \"Chennai, India\";\n}` },
      { type: 'file', name: 'contact.json', ext: 'json', content: `{"email":"sarvaruna@outlook.com","github":"sarvarunajvm","linkedin":"/in/saravanan-kalimuthu-01a0a9113"}` },
    ],
  },
  {
    type: 'folder',
    name: 'experience',
    children: [
      { type: 'file', name: 'paypal.java', ext: 'java', content: `@Company(\"PayPal\")\n@Duration(\"May 2021 - Present\")\npublic class SrSoftwareEngineer {\n  private final List<String> achievements = Arrays.asList(\n    \"✅ Closed webhook gap → 10% merchants\",\n    \"📊 Near real-time analytics → +0.01% revenue\",\n    \"⚡ Spam <2%; API +1.5x\"\n  );\n}` },
      { type: 'file', name: 'assetpulse.java', ext: 'java', content: `@Company(\"Assetpulse\")\n@Duration(\"Oct 2019 - May 2021\")\npublic class SoftwareEngineer {\n  private final List<String> achievements = Arrays.asList(\n    \"✅ BLE over RFID → −33% cost\",\n    \"⚡ Triangulation via WebSocket → +5% conversions\"\n  );\n}` },
      { type: 'file', name: 'timeline.json', ext: 'json', content: `[{"company":"PayPal","from":"2021-05"},{"company":"Assetpulse","from":"2019-10","to":"2021-05"}]` },
    ],
  },
  {
    type: 'folder',
    name: 'projects',
    children: [
      { type: 'file', name: 'paypal-webhooks.java', ext: 'java', content: `public class PayPalWebhooks {\n  String description = \"Closed product gap with analytics\";\n  String[] techStack = {\"Java\", \"Spring\", \"Kafka\"};\n  @GitHub(\"private\")\n  @OpenSource(false)\n}` },
      { type: 'file', name: 'port-advancer.java', ext: 'java', content: `public class PortAdvancer {\n  String description = \"Self-serve port forwarding in restricted networks\";\n  String[] techStack = {\"Node.js\", \"Networking\"};\n  @GitHub(\"sarvarunajvm/port-advancer\")\n  @OpenSource(true)\n}` },
      { type: 'file', name: 'opensource.md', ext: 'md', content: `- vue-embed-gist: contribution (~270 weekly downloads)\n- utils-commons: Java utilities` },
    ],
  },
  {
    type: 'folder',
    name: 'skills',
    children: [
      { type: 'file', name: 'backend.xml', ext: 'xml', content: `<skills category=\"backend\"><language proficiency=\"expert\">Java</language><framework proficiency=\"advanced\">Spring Boot</framework></skills>` },
      { type: 'file', name: 'frontend.jsx', ext: 'jsx', content: `const FrontendSkills = () => { const skills = { frameworks: ['React','Vue'], languages:['JavaScript','TypeScript'] }; return <div className=\"frontend-expertise\" /> }` },
      { type: 'file', name: 'devops.yaml', ext: 'yaml', content: `devops:\n  tools: [Jenkins, GitHub Actions, Docker]\n  cloud: [GCP, AWS]\n` },
    ],
  },
  {
    type: 'folder',
    name: 'education',
    children: [
      { type: 'file', name: 'mca.md', ext: 'md', content: `- University of Madras (2016-2019)\n- 6.48 CGPA\n- Cloud-based secure storage (double encryption)` },
    ],
  },
]

