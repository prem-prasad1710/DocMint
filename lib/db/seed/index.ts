import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../mongodb';
import DocumentTemplate from '../models/DocumentTemplate';
import ComplianceChecklist from '../models/ComplianceChecklist';
import { SEED_TEMPLATES } from './templates';
import { SEED_CHECKLISTS } from './checklists';

/**
 * Seed the database with initial templates and checklists
 * Run this script once during initial deployment
 */

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    await connectDB();
    
    // Seed Document Templates
    console.log('📄 Seeding document templates...');
    for (const template of SEED_TEMPLATES) {
      const exists = await DocumentTemplate.findOne({
        country: template.country,
        documentType: template.documentType,
        industry: template.industry,
      });
      
      if (!exists) {
        await DocumentTemplate.create(template);
        console.log(`✅ Created template: ${template.name}`);
      } else {
        console.log(`⏭️  Template already exists: ${template.name}`);
      }
    }
    
    // Seed Compliance Checklists
    console.log('📋 Seeding compliance checklists...');
    for (const checklist of SEED_CHECKLISTS) {
      const exists = await ComplianceChecklist.findOne({
        country: checklist.country,
        industry: checklist.industry,
      });
      
      if (!exists) {
        await ComplianceChecklist.create(checklist);
        console.log(`✅ Created checklist: ${checklist.name}`);
      } else {
        console.log(`⏭️  Checklist already exists: ${checklist.name}`);
      }
    }
    
    console.log('✅ Database seeding completed successfully!');
    
    // Count totals
    const templateCount = await DocumentTemplate.countDocuments({ isActive: true });
    const checklistCount = await ComplianceChecklist.countDocuments({ isActive: true });
    
    console.log(`📊 Summary: ${templateCount} templates, ${checklistCount} checklists`);
    
    return { success: true, templateCount, checklistCount };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Allow running this file directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
