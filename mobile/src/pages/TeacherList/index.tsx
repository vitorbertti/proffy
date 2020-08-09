import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

function TeacherList() {
   const [isFilterVisible, setIsFiltersVisible] = useState(false);

   const [subject, setSubject] = useState('');
   const [weekDay, setWeekDay] = useState('');
   const [time, setTime] = useState('');
   const [teachers, setTeachers] = useState([]);

   const [favorites, setFavorites] = useState<Number[]>([]);

   function handleToggleFiltersVisible() {
      setIsFiltersVisible(!isFilterVisible);
   }

   async function handleFiltersSubmit() {
      loadFavorites();

      const response = await api.get('classes', {
         params: {
            subject,
            week_day: weekDay,
            time,
         },
      });

      setIsFiltersVisible(false);
      setTeachers(response.data);
   }

   function loadFavorites() {
      AsyncStorage.getItem('favorites').then((response) => {
         if (response) {
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
               return teacher.id;
            });
            setFavorites(favoritedTeachersIds);
         }
      });
   }

   return (
      <View style={styles.container}>
         <PageHeader
            title="Proffys disponíveis"
            headerRight={
               <BorderlessButton onPress={handleToggleFiltersVisible}>
                  <Feather name="filter" size={20} color="#fff" />
               </BorderlessButton>
            }
         >
            {isFilterVisible && (
               <View style={styles.searchForm}>
                  <Text style={styles.label}>Materia</Text>
                  <TextInput
                     placeholderTextColor="#c1bccc"
                     style={styles.input}
                     placeholder="Qual a matéria?"
                     value={subject}
                     onChangeText={(text) => setSubject(text)}
                  />

                  <View style={styles.inputGroup}>
                     <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                        <TextInput
                           placeholderTextColor="#c1bccc"
                           style={styles.input}
                           placeholder="Qual o dia?"
                           value={weekDay}
                           onChangeText={(text) => setWeekDay(text)}
                        />
                     </View>

                     <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput
                           placeholderTextColor="#c1bccc"
                           style={styles.input}
                           placeholder="Qual horário?"
                           value={time}
                           onChangeText={(text) => setTime(text)}
                        />
                     </View>
                  </View>

                  <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                     <Text style={styles.submitButtonText}>Filtrar</Text>
                  </RectButton>
               </View>
            )}
         </PageHeader>

         <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
         >
            {teachers.map((teacher: Teacher) => (
               <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
            ))}
         </ScrollView>
      </View>
   );
}

export default TeacherList;
