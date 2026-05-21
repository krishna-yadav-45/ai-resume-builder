import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  contact: { fontSize: 10, color: '#555', marginBottom: 2 },
  section: { marginTop: 14 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 2, marginBottom: 6 },
  text: { fontSize: 10, marginBottom: 3 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 10, backgroundColor: '#e5e7eb', padding: '3 8', borderRadius: 4 },
});

function ResumePDF({ resume }) {
  const { personalInfo, summary, skills, projects, experience, education } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <Text style={styles.name}>{personalInfo?.name}</Text>
        <Text style={styles.contact}>{personalInfo?.email} | {personalInfo?.phone} | {personalInfo?.location}</Text>
        {personalInfo?.linkedin && <Text style={styles.contact}>LinkedIn: {personalInfo.linkedin}</Text>}
        {personalInfo?.github && <Text style={styles.contact}>GitHub: {personalInfo.github}</Text>}

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skills.map((skill, i) => (
                <Text key={i} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{p.name}</Text>
                <Text style={styles.text}>{p.description}</Text>
                <Text style={styles.text}>Tech: {p.technologies}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((e, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{e.position} — {e.company}</Text>
                <Text style={styles.text}>{e.startDate} - {e.endDate}</Text>
                <Text style={styles.text}>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((e, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{e.degree} — {e.institution}</Text>
                <Text style={styles.text}>{e.startDate} - {e.endDate} | {e.grade}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}

export default ResumePDF;